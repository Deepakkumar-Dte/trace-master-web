import { node } from "@/types";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from "react";

interface userListType {
  name: string;
  email: string;
  id: string;
}

type NodeMappingData = {
  defaultNodeList: Map<string, node>;
  setDefaultNodeList: Dispatch<
    SetStateAction<NodeMappingData["defaultNodeList"]>
  >;
  userList: { label: string; value: string }[];
  setUserOptions: (arg: userListType[]) => void;
};

const NodeMappingContextInitialValue: NodeMappingData = {
  defaultNodeList: new Map(),
  userList: [],
  setDefaultNodeList: () => {},
  setUserOptions: (arg: userListType[]) => {},
};

export const NodeMappingContext = createContext(NodeMappingContextInitialValue);

const NodeMappingContextProvider = ({ children }: PropsWithChildren) => {
  const [defaultNodeList, setDefaultNodeList] = useState<Map<string, node>>(
    new Map()
  );
  const [userList, setuserList] = useState<NodeMappingData["userList"]>([]);

  const setUserOptions = (users: userListType[]) => {
    setuserList(users.map((e) => ({ label: e.name, value: e.id })));
  };
  return (
    <NodeMappingContext.Provider
      value={{ defaultNodeList, setDefaultNodeList, userList, setUserOptions }}
    >
      {children}
    </NodeMappingContext.Provider>
  );
};

export default NodeMappingContextProvider;
