/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import "@xyflow/react/dist/style.css";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  Background,
  BackgroundVariant,
  Edge,
  Connection,
} from "@xyflow/react";
import { v4 } from "uuid";
import { CustomEdge, CustomNode, DraggaleNode } from "@/components/custom";
import { useDrop } from "react-dnd";
import { Button, Spinner } from "@/components/ui";
import { getProcessMappingNodes, upsertProcessMappingData } from "@/shared/api";
import { useParams, useRouter } from "next/navigation";
import { customNodeProps } from "@/types";
import { NodeMappingContext } from "@/context/nodeMappingContext";
import {
  convertEdgeDataIntoPayload,
  convertMappingNodeDataIntoNode,
  convertNodeDataIntoNodeMap,
  convertNodeDataIntoPayload,
  validateNodeConnection,
} from "@/helpers";
import { useToast } from "@/components/ui/use-toast";

const NodeMapping = () => {
  const { toast } = useToast();
  const navigate = useRouter();
  const { addNodes } = useReactFlow();
  const { processId } = useParams();
  const { defaultNodeList, setDefaultNodeList, setUserOptions } =
    useContext(NodeMappingContext);
  const [isLoading, setisLoading] = useState(true);
  const [nodes, setNodes, onNodesChange] = useNodesState<customNodeProps>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const existingConnections = useRef<string[]>([]);
  const removedConnections = useRef<string[]>([]);

  const fetchData = useCallback(async () => {
    try {
      setisLoading(true);
      const { data } = await getProcessMappingNodes({ processId });
      const { defaultNodes, users, edges, mappingNodes } = data;
      setDefaultNodeList(convertNodeDataIntoNodeMap(defaultNodes));
      setNodes(convertMappingNodeDataIntoNode(mappingNodes));
      existingConnections.current = edges.map((e: Edge) => e.id);
      setEdges(edges);
      setUserOptions(users);
    } catch (err) {
      console.log(err);
    } finally {
      setisLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleRemove = (id: any) => {
    setNodes((pre: any) => pre.filter((e: any) => e.id !== id));
  };

  const drop = useDrop(() => ({
    accept: "NODE",
    drop: (item: any) => {
      const newNode = {
        id: v4(),
        type: "default",
        position: { x: 0, y: 0 },
        data: { ...item.data, defaultId: item.id, onRemove: handleRemove },
      };
      addNodes([newNode]);
    },
  }))[1];

  const onConnect = useCallback(
    (params: Connection) => {
      const { source, target, sourceHandle, targetHandle } = params;
      const sourceDefaultKey =
        nodes.find((e) => e.id === source)?.data.defaultId ?? "";
      const targetDefaultKey =
        nodes.find((e) => e.id === target)?.data.defaultId ?? "";
      const sourceNode = defaultNodeList.get(sourceDefaultKey);
      const targetNode = defaultNodeList.get(targetDefaultKey);
      const sourceProcessId = (sourceHandle ?? "").split(":")[0];
      const targetProcessId = (targetHandle ?? "").split(":")[0];
      if (
        sourceNode !== undefined &&
        targetNode !== undefined &&
        sourceProcessId &&
        targetProcessId
      ) {
        const sourceFormData =
          sourceNode.processes.find((e) => e.id === sourceProcessId)?.outputs ??
          [];
        const targetFormData =
          targetNode.processes.find((e) => e.id === targetProcessId)?.inputs ??
          [];
        if (
          validateNodeConnection(
            sourceFormData,
            targetFormData,
            sourceNode.childIoForms,
            targetNode.childIoForms
          )
        ) {
          setEdges((eds) => addEdge({ ...params, id: v4() }, eds));
        } else {
          toast({
            title: "Error",
            variant: "destructive",
            description:
              "Please Ensure the SourceNode Outputs and Target Node Inputs form details are same",
          });
        }
      }
    },
    [setEdges, nodes]
  );

  const handleSave = async () => {
    try {
      const nodeData = convertNodeDataIntoPayload(nodes);
      const edgeData = convertEdgeDataIntoPayload(edges, processId as string);
      upsertProcessMappingData({
        nodes: nodeData,
        edges: edgeData,
        removedConnections: removedConnections.current,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const removeEdgeOnClick = (edge: Edge) => {
    const initValue: { removedEdge: Edge | null; filteredEdges: Edge[] } = {
      removedEdge: null,
      filteredEdges: [],
    };
    const { removedEdge, filteredEdges } = edges.reduce((acc, cur) => {
      if (edge.id === cur.id) {
        acc.removedEdge = cur;
      } else {
        acc.filteredEdges.push(cur);
      }
      return acc;
    }, initValue);
    if (removedEdge && existingConnections.current.includes(removedEdge.id))
      removedConnections.current.push(removedEdge.id);

    setEdges(filteredEdges);
  };

  return (
    <div className="h-full w-full mb-5" ref={drop as any}>
      {!isLoading ? (
        <>
          <div className="h-[60px] flex justify-between p-2">
            <div>
              <Button onClick={() => navigate.back()}>Back</Button>
            </div>
            <div className="flex gap-4">
              <Button onClick={() => navigate.push("manage/node")}>
                Manage
              </Button>
              <Button onClick={handleSave}>Save</Button>
            </div>
          </div>
          <ReactFlow
            onError={(data, msg) => {
              console.log(data, msg);
            }}
            nodes={nodes}
            edges={edges}
            edgeTypes={{ default: CustomEdge }}
            onEdgeClick={(e, edge) => {
              removeEdgeOnClick(edge);
            }}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={{ default: CustomNode as any }}
            defaultViewport={{ zoom: 0.7, x: 200, y: 200 }}
          >
            <Background
              size={2.5}
              variant={BackgroundVariant.Dots}
              style={{ backgroundColor: "white" }}
            />
          </ReactFlow>
          <div className="absolute bottom-0 h-[100px] flex p-2 gap-2">
            {Array.from(defaultNodeList.values(), ({ id, ...rest }) => {
              rest.processes = [];
              return <DraggaleNode data={rest} id={id} key={id} />;
            })}
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default NodeMapping;
