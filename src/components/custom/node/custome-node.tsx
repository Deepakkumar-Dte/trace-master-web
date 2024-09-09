'use client'
import { Handle, HandleProps, Position } from "@xyflow/react";
import type { customNodeProps, IOFormtype, IoKeyType } from "../../../types";
import { memo, useMemo, useCallback } from "react";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui";

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
  const processesLength = useMemo(() => {
    return data.processes.length ?? 2;
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

  return (
    <div style={{ minHeight: `${processesLength * 200}px` }}>
      <input style={{ border: 0, width: "100%" }} value={data.name} />
      {...data.processes.map((process, index) => {
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
    </div>
  );
};

export default memo(CustomNode);
