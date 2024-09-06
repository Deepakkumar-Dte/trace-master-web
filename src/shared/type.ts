import { SVGProps } from "react";

export type NodeType = {
  id: string;
  name: string;
  description?: string;
  defaultId?: string;
  processId: string;
  inchargeId?: string;
  initiated?: 0 | 1;
  initial?: boolean;
  x?: number | string; 
  y?: number | string;
};

export type ConnectionType = {
  connection_id: string;
  tracking_id: string;
  source_node: string;
  target_node: string;
};

export type FormDataType = {
  form_id: string;
  label: string;
  data: string;
  variable_name: string;
  data_type: string;
  lookup_id: string;
  node_id: string;
  required: boolean;
  is_form: boolean;
};

export type TrackingType = {
  tracking_id: string;
  title: string;
  description: string;
};

export type iconProps = SVGProps<SVGSVGElement> & { color: string | null };
