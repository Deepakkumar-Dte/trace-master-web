import { Node } from "@xyflow/react";

export type IODataType =
  | "auto"
  | "text"
  | "number"
  | "dropdown"
  | "component"
  | "file"
  | "Date";

export interface IOFormtype {
  id: string;
  label: string;
  variableName: string;
  dataType: IODataType;
  recurring: boolean;
  lookupId?: string;
  lookupValueId?: string;
}

export interface processes {
  id: string;
  name: string;
  script?: string;
  inputs: IOtype[];
  outputs: IOtype[];
}
export type node = {
  id: string;
  name: string;
  description?: string;
  processes: processes[];
  defaultId: string | null;
  inchargeId: string | null;
  processId: string;
  x?: number;
  y?: number;
};

export type customNodeProps = Node & {
  data: node;
  onRemove?: (nodeId: string) => void;
};

export type IoKeyType = "input" | "output";
