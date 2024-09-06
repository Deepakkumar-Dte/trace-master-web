import { ClassicPreset as Classic, GetSchemes, NodeEditor, Root } from "rete";
import { DockPresets, DockPlugin } from "rete-dock-plugin";
import { Area2D, AreaExtensions, AreaPlugin } from "rete-area-plugin";
import {
  ConnectionPlugin,
  Presets as ConnectionPresets,
} from "rete-connection-plugin";
import {
  ReactPlugin,
  ReactArea2D,
  Presets as ReactPresets,
} from "rete-react-plugin";
import { createRoot } from "react-dom/client";
import { DataflowEngine } from "rete-engine";
import { AutoArrangePlugin, Presets } from "rete-auto-arrange-plugin";
import { MinimapExtra, MinimapPlugin } from "rete-minimap-plugin";
import {
  ReroutePlugin,
  RerouteExtra,
  RerouteExtensions,
} from "rete-connection-reroute-plugin";
import { NodeType } from "../../shared/type";
import NodeGenarator from "./Generator";
import { generateUUID } from "three/src/math/MathUtils.js";
import { CustomeDropDown, DropDown } from "./node-dropdown";
import EventEmitter from "../../shared/eventEmitter";
import { MutableRefObject } from "react";
import { conStyle, styles } from "./style";
import { validateNodeConnection } from "../../shared/utils";

type Node = NodeGenarator;
type Conn = Connection<Node, Node>;
type Schemes = GetSchemes<Node, Conn>;

type dataTypes = {
  connection: Conn;
  create: Node;
};

type EventHandler<T extends keyof dataTypes = "connection"> = (context: {
  type: string;
  data: dataTypes[T];
}) => Promise<any>;
class Connection<A extends Node, B extends Node> extends Classic.Connection<
  A,
  B
> {}

class Connections extends Classic.Connection<Node, Node> {
  public connectionId: string = "";
  constructor(id: string, source: Node, target: Node) {
    super(source, "output", target, "input");
    this.connectionId = id;
    this.id = id;
  }
}

type AreaExtra =
  | Area2D<Schemes>
  | ReactArea2D<Schemes>
  | MinimapExtra
  | RerouteExtra;

export class CreateEditor {
  editor: NodeEditor<Schemes> | {} = {};
  removedConnections: any[] = [];
  constructor() {}
  async init(
    data: { userList: any; processData: any },
    ref: MutableRefObject<any>
  ): Promise<{
    destroy: () => void;
    editor: NodeEditor<Schemes>;
    area: AreaPlugin<Schemes, AreaExtra>;
  } | null> {
    try {
      const container = document.getElementById("rete");
      if (container) {
        return await createEditor(container, data, ref);
      }
      return null;
    } catch (err) {
      return null;
    }
  }
}

export async function createEditor(
  container: HTMLElement,
  data: any,
  ref: MutableRefObject<any>
) {
  const input = new EventEmitter();
  const { defaultNodes, mappingNodes, connections, formData } =
    data.processData;
  let isDockery = true;
  const NodeGen = NodeGenarator.bind(null, formData, data.userList);
  const editor = new NodeEditor<Schemes>();
  const area = new AreaPlugin<Schemes, AreaExtra>(container);
  const connection = new ConnectionPlugin<Schemes, AreaExtra>();
  const reactRender = new ReactPlugin<Schemes, AreaExtra>({ createRoot });
  const dock = new DockPlugin<Schemes>();
  // const minimap = new MinimapPlugin<Schemes>({
  //   minDistance: 0,
  //   boundViewport: true,
  //   ratio: 2,
  // });
  const reroutePlugin = new ReroutePlugin<Schemes>();
  const dataflow = new DataflowEngine<Schemes>();
  const arrange = new AutoArrangePlugin<Schemes, AreaExtra>();
  const socket = new Classic.Socket("socket");
  editor.use(area);
  editor.use(dataflow);
  area.use(reactRender);
  area.use(arrange);
  area.use(connection);
  // area.use(minimap);
  area.use(dock);
  reactRender.use(reroutePlugin);

  arrange.addPreset(Presets.classic.setup({}));
  dock.addPreset(DockPresets.classic.setup({ area, size: 110, scale: 0.7 }));
  connection.addPreset(ConnectionPresets.classic.setup());
  reactRender.addPreset(
    ReactPresets.classic.setup({
      customize: {
        node: (data) => {
          return (props) => (
            <ReactPresets.classic.Node styles={() => styles} {...props} />
          );
        },
        connection: (data) => {
          return (props) => (
            <ReactPresets.classic.Connection
              styles={() => conStyle}
              {...props}
            />
          );
        },
        control(data) {
          if (data.payload instanceof DropDown) {
            return (props) => <CustomeDropDown {...props} />;
          }
          return (props) => (
            <ReactPresets.classic.Control
              styles={() => {}}
              {...(props as any)}
            />
          );
        },
      },
    })
  );
  defaultNodes.forEach((e: NodeType, i: number) => {
    const Node = () =>
      new NodeGen({ data: e, isDefault: isDockery, socket }, input);
    dock.add(Node);
    isDockery = i !== defaultNodes.length - 1;
  });

  await mappingNodes.forEach(async (e: NodeType) => {
    await editor.addNode(
      new NodeGen({ data: e, isDefault: false, socket }, input)
    );
    area.translate(e.id, { x: Number(e.x) || 0, y: Number(e.y) || 0 });
  });
  reactRender.addPreset(ReactPresets.minimap.setup());
  reactRender.addPreset(
    ReactPresets.reroute.setup({
      contextMenu(id) {
        reroutePlugin.remove(id);
      },
      translate(id, dx, dy) {
        reroutePlugin.translate(id, dx, dy);
      },
      pointerdown(id) {
        reroutePlugin.unselect(id);
        reroutePlugin.select(id);
      },
    })
  );

  input.on("input", async ({ controlId, id, value }) => {
    const { dropdown } = editor.getNode(id).controls as any;
    dropdown.value = value;
    await area.update("control", controlId);
  });

  await AreaExtensions.zoomAt(area, editor.getNodes(), { scale: 0.1 });
  // AreaExtensions.simpleNodesOrder(area);

  connections.forEach(async (e: any) => {
    const { sourceNode, targetNode, connectionId } = e;
    await editor.addConnection(
      new Connections(
        connectionId,
        editor.getNode(sourceNode),
        editor.getNode(targetNode)
      )
    );
  });
  const selector = AreaExtensions.selector();
  const accumulating = AreaExtensions.accumulateOnCtrl();
  AreaExtensions.selectableNodes(area, selector, { accumulating });
  RerouteExtensions.selectablePins(reroutePlugin, selector, accumulating);

  const connectionValidation: EventHandler<"connection"> = async (context) => {
    const { source, target, connectionId }: any = context.data;
    const sourceNode = (
      formData[editor.getNode(source).defaultId as string] || { output: [] }
    ).output;
    const targetNode = (
      formData[editor.getNode(target).defaultId as string] || { input: [] }
    ).input;

    if (validateNodeConnection(sourceNode, targetNode)) {
      checkNewConnectionWithRemoved(source, target);
      context.data.id = connectionId || generateUUID();
      return context;
    }
    return;
  };

  const checkNewConnectionWithRemoved = (source: string, target: string) => {
    ref.current.removedConnections = ref.current.removedConnections.filter(
      (con: any) => {
        return con.source !== source && target !== con.target;
      }
    );
  };

  const connectionRemove: EventHandler<"connection"> = async (context: any) => {
    if (context.data.connectionId)
      ref.current.removedConnections.push(context.data);
    return context;
  };

  const eventHandler = (context: Root<Schemes>) => {
    switch (context.type) {
      case "connectioncreate":
        return connectionValidation(context);
      case "connectionremove":
        return connectionRemove(context);
      default:
        return context;
    }
  };
  editor.addPipe(eventHandler);
  return {
    destroy: () => area.destroy(),
    editor,
    area,
  };
}
