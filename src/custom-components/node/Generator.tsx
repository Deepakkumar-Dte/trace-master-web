import { ClassicPreset as Classic } from "rete";
import { DataflowNode } from "rete-engine";
import { generateUUID } from "three/src/math/MathUtils.js";
import { NodeType } from "../../shared/type";
import { DropDown } from "./node-dropdown";
import EventEmitter from "../../shared/eventEmitter";

class NodeGenarator extends Classic.Node implements DataflowNode {
  width = 290;
  height = 100;
  defaultId: string | null = null;
  initiated = 0;
  inchargeId: string = "";
  initial?: boolean = false;
  value: any = "";
  constructor(
    formData: any,
    userList: any,
    params: {
      data: NodeType;
      isDefault: boolean;
      socket: Classic.Socket;
    },
    event: EventEmitter
  ) {
    const {
      id,
      name,
      defaultId = null,
      initiated = 0,
      initial = false,
      inchargeId = "",
    } = params.data;

    super(name);
    this.id = params.isDefault || defaultId ? id : generateUUID();
    this.defaultId = defaultId || id;
    this.initiated = initiated;
    this.inchargeId = inchargeId;
    this.initial = initial;
    if (!params.isDefault) {
      const { input = [], output = [] } = formData[this.defaultId] || {
        input: [],
        output: [],
      };
      if (input.length) {
        const label =
          input.reduce(
            (a: any, c: any) => {
              return {
                label:
                  `${a.label}` +
                  `${a.label ? "," : ""}` +
                  `${c.label} : ${c.dataType}`,
              };
            },
            { label: "" }
          ) || "";
        this.addInput(
          "input",
          new Classic.Input(params.socket, label.label, true)
        );
      }

      const options = userList.map((e: any) => {
        return {
          id: e.id,
          name: e.name,
        };
      });
      const controlId = `${this.id}/incharge`;
      const changeHandler = (e: any) => {
        this.inchargeId = e;
        event.emit("input", {
          controlId,
          id: this.id,
          value: e,
        });
      };
      const payload: [string, string, any, (e: any) => void, any] = [
        controlId,
        "In-Charge",
        options,
        changeHandler,
        this.inchargeId,
      ];
      this.addControl("dropdown", new DropDown(...payload));
      if (output.length) {
        const label =
          output.reduce(
            (a: any, c: any) => ({
              label: `${a.label}${a.label ? "," : ""}${c.label}`,
            }),
            { label: "" }
          ) || "";
        this.addOutput(
          "output",
          new Classic.Output(params.socket, label.label)
        );
      }
    }
    return this;
  }
  data(inputs: Record<string, any>) {
    return { value: 1 };
  }
}

export default NodeGenarator;
