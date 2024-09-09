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
  x?: number;
  y?: number;
};

export interface customNodeProps {
  id: string;
  data: node;
  onRemove: (nodeId: string) => void;
}

export type IoKeyType = "input" | "output";
