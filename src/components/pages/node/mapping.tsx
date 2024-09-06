import { CreateEditor } from "@/custom-components/node";
import { useEffect, useRef } from "react";
import {
  getTrackingNodes,
  getUserList,
  createMappingNodes,
} from "@/shared/api";
import { useFetch } from "@/customeHooks";
import { Loader2 as Spinner } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { ComponentTitleBar } from "@/components/custom";
import { Button } from "@/components/ui";

export default function Mapping() {
  const { processId } = useParams();
  const navigate = useRouter();
  const apiData = {
    processData: getTrackingNodes,
    userList: getUserList,
  };
  const payload = {
    processData: [{ processId }],
  };
  const [loading, data] = useFetch(apiData, payload);
  const nodeRef = useRef<any>(null);
  const extraRef = useRef<any>({ removedConnections: [] });
  const editor = new CreateEditor();
  useEffect(() => {
    if (!loading) {
      fetchNodes();
    }
  }, [loading]);
  const fetchNodes = async () => {
    try {
      const rete = await editor.init(data, extraRef);
      nodeRef.current = rete;
    } catch (error) {
      console.log(`Error : ${error}`);
    }
  };

  const handleSaveData = async (
    nodes: any,
    connections: any,
    views: Map<string, any>
  ) => {
    try {
      const error: any = {};
      const nodeData = nodes.map(
        ({ id, label, inchargeId, initiated, defaultId, initial }: any) => {
          const {
            position: { x, y },
          } = views.get(id);
          if (!inchargeId) error[id] = "Please select the Incharge";
          return {
            nodeId: id,
            initiated: Boolean(initiated),
            initial,
            title: label,
            inchargeId,
            defaultId,
            processId,
            x,
            y,
          };
        }
      );
      let connectionData: {
        sourceNode: string;
        targetNode: string;
        processId: string;
        connectionId: string;
      }[] = [];
      connections.forEach((e: any) => {
        connectionData.push({
          sourceNode: e.source,
          targetNode: e.target,
          processId: processId as string,
          connectionId: e.id,
        });
      });
      if (Object.keys(error).length)
        return alert("please select the incharge for the respective nodes");
      const params = {
        nodes: nodeData,
        connections: connectionData,
        removedNodes: [],
        removedConnections: extraRef.current.removedConnections.map(
          (e: any) => e.id
        ),
      };
      console.log(params);
      await createMappingNodes(params);
      alert("Pipe-line Updated Successfully");
      navigate.back();
    } catch (err) {
      console.log(err);
    }
  };

  const deDuplication = (existConnections: any[], newConnections: any[]) => {
    const connectionGraph: Map<string, Set<string>> = new Map();
    existConnections.forEach(({ sourceNode, targetNode }: any) => {
      const targetNodes = connectionGraph.get(sourceNode) || new Set();
      targetNodes.add(targetNode);
      connectionGraph.set(sourceNode, targetNodes);
    });
    return newConnections.filter((con: any) => {
      const { source, target } = con;
      if (!connectionGraph.has(source)) return true;
      const preCon = connectionGraph.get(source) || new Set();
      return !preCon.has(target);
    });
  };

  const handleSavePipeLine = () => {
    const { trackingData: { connections: prevConnections = [] } = {} } =
      data || {};
    const { nodes, connections: newConnections } = nodeRef.current?.editor;
    handleSaveData(
      nodes,
      deDuplication(prevConnections, newConnections),
      nodeRef.current?.area.nodeViews
    );
  };

  const handleManageNodes = () => {
    navigate.push(`/process/`);
  };

  if (loading) return <Spinner />;
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: "5px",
        }}
      >
       <Button>Back</Button>
        <CustomButton
          startIcon={``}
          buttonName="Manage Nodes"
          handleOnClick={() => {
            navigate("/node", { state: { processId } });
          }}
          customStyle={{
            backgroundColor: "gray",
            width: "150px",
            padding: "0.5rem 1rem",
          }}
        />
      </div>
      <div className="flex justify-between items-center my-4">
        <HeaderText classes={`text-[14px]`} text={`Sample Request Tracking`} />
        <div className="flex justify-end items-center gap-x-12">
          <CustomButton
            buttonName="Save Pipeline"
            handleOnClick={handleSavePipeLine}
            customStyle={{
              width: "109px",
              height: "40px",
            }}
          />
          <CustomButton
            buttonName="Cancel"
            handleOnClick={handleManageNodes}
            customStyle={{
              width: "150px",
              padding: "0.5rem",
              ...whiteButtonStyle,
            }}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100% - 50px)",
          padding: "20px",
        }}
      >
        <div
          style={{
            height: "100%",
            width: "100%",
            margin: 0,
          }}
          id="rete"
          className="rete"
        ></div>
      </div>
    </div>
  );
}
