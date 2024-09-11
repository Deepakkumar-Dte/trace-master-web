"use client";
import { Handle, HandleProps, Position } from "@xyflow/react";
import type { customNodeProps, IOFormtype, IoKeyType } from "../../../types";
import { memo, useMemo, useCallback, useState, useEffect } from "react";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui";
import { useContext } from "react";
import { NodeMappingContext } from "@/context/nodeMappingContext";

const handlerCommonAttributes: Record<IoKeyType, HandleProps> = {
  input: {
    position: Position.Left,
    type: "target",
  },
  output: {
    position: Position.Right,
    type: "source",
  },
};

const CustomNode = ({ data }: customNodeProps) => {
  const { defaultNodeList, userList } = useContext(NodeMappingContext);
  const defaultNodeData = defaultNodeList.get(data.defaultId as string);
  const [formData, setFormData] = useState<{
    name: string;
    inchargeId: string | null;
  }>({ name: "", inchargeId: null });

  useEffect(() => {
    if (defaultNodeData) {
      setFormData({
        name: data.name,
        inchargeId: data.inchargeId,
      });
    }
  }, []);

  const Handler = useCallback(
    (
      data: IOFormtype[],
      process: { name: string; index: number; id: string },
      type: IoKeyType
    ) => {
      const partial = 100 / data.length;
      const top = partial / 2 + process.index * partial;
      return (
        <HoverCard key={`${process.id}-${type}`}>
          <HoverCardTrigger asChild>
            <Handle
              id={`${process.id}-${type}`}
              style={{
                top: `${top}%`,
                right: "-1%",
                height: "10px",
                width: "10px",
              }}
              {...handlerCommonAttributes[type]}
            />
          </HoverCardTrigger>
          <HoverCardContent>{process.name}</HoverCardContent>
        </HoverCard>
      );
    },
    []
  );

  const onChange = (name: "name" | "inchargeId", value: string) => {
    data[name] = value;
    setFormData((pre) => ({ ...pre, [name]: value }));
  };

  if (!defaultNodeData) return;
  return (
    <div
      style={{
        minHeight: `${((defaultNodeData.processes ?? []).length ?? 2) * 200}px`,
      }}
    >
      <input
        style={{ border: 0, width: "100%" }}
        value={formData.name}
        onChange={(e) => onChange("name", e.target.value)}
      />
      {...defaultNodeData.processes.map((process, index) => {
        return [
          Handler(
            process.inputs ?? [],
            { name: process.name, index, id: process.id },
            "input"
          ),
          Handler(
            process.outputs ?? [],
            { name: process.name, index, id: process.id },
            "output"
          ),
        ];
      })}
      <select
        value={formData.inchargeId ?? ""}
        onChange={(e) =>
          e.target.value && onChange("inchargeId", e.target.value)
        }
        style={{
          position: "absolute",
          bottom: 5,
          left: 0,
          width: "calc(100% - 10px)",
          margin: "0px 5px",
        }}
      >
        <option key={"default"} value={""}>
          select incharge
        </option>
        {userList.map((e) => {
          return (
            <option key={e.value} value={e.value}>
              {e.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default memo(CustomNode);
