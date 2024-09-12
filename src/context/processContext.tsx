/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useFormik } from "formik";
import { upsertDefaultNode } from "../shared/api";
import React,{ createContext, useCallback, useRef, useState } from "react";
import { schema } from "../shared/validation_schema/node";
import { useParams, useRouter } from "next/navigation";
import { v4 } from "uuid";
import { useToast } from "@/components/ui/use-toast";

type formType = "inputs" | "outputs";

type removeProcess = (index: number) => void;
type addIOForm = (type: formType, processIndex: number, key?: string) => void;
type removeIOForm = (
  type: formType,
  processIndex: number,
  ioIndex: number
) => void;
type handleChange = (arg: {
  name: string;
  value: any;
  processIndex?: number;
  ioIndex?: number;
  type?: formType;
}) => void;

export type IoFormArgs = {
  label: string | null;
  variableName: string | null;
  dataType: "text" | "number" | "auto" | "date" | "dropdown" | "object" | null;
  type: "input" | "output";
  required: boolean;
  processId: string | null;
  id: string;
  parentId?: string | null;
  formType: "input" | "output";
  lookupId?: string;
  lookupValueId?: string;
};

const ioFormInitialValue: IoFormArgs = {
  label: "",
  variableName: "",
  dataType: null,
  required: false,
  id: "",
  type: "input",
  processId: null,
  formType: "output",
};

const initProcessValues = {
  setData: (_arg: any) => {},
  processes: [
    {
      inputs: [] as IoFormArgs[],
      outputs: [] as IoFormArgs[],
      name: "",
      script: "",
      id: null,
    },
  ],
  childIoForms: {} as Record<string, IoFormArgs[]>,
  formData: {
    name: "",
    description: "",
    initial: false,
  },
  addProcess: () => {},
  removeProcess: (_processIndex: number) => {},
  addIOForm: (_type: formType, _processIndex: number, key?: string) => {},
  removeIOForm: (
    _type: formType,
    _processIndex: number,
    _ioIndex: number
  ) => {},
  handleChange: (_arg: {
    name: string;
    value: any;
    processIndex?: number;
    ioIndex?: number;
    type?: formType;
  }) => {},
  errors: {} as any,
  handleSubmit: () => {},
  removeChildForm: (key: string, index: number) => {},
  handleChildChange: ({
    key,
    index,
    name,
    value,
  }: {
    key: string;
    index: number;
    name: string;
    value: string;
  }) => {},
};

export const NodeProcessContext = createContext(initProcessValues);

const NodeProcessContextProvider = ({ children }: any) => {
  const { toast } = useToast();
  const [processes, setProcesses] = useState(initProcessValues.processes);
  const [formData, setformData] = useState(initProcessValues.formData);
  const [childIoForms, setChildIoForms] = useState<
    Record<string, IoFormArgs[]>
  >({});
  const [errors, seterrors] = useState({});
  const removedItems = useRef({ processes: [], formData: [] });
  const { processId } = useParams();
  const navigate = useRouter();

  // Node Process Add Function
  const addProcess = useCallback(() => {
    setProcesses((prev) => [...prev, initProcessValues.processes[0]]);
  }, []);

  // Node Process removed and added into the removedItems ref
  const removeProcess: removeProcess = useCallback((index) => {
    const tempProcess = processes[index];
    if (tempProcess.id) removedItems.current.processes.push(tempProcess.id);
    removedItems.current.formData = removedItems.current.formData.filter(
      (e: any) => e.processId !== tempProcess.id
    );
    setProcesses((pre) => pre.filter((_e, i) => i !== index));
  }, []);

  // NodeProcess Form input and output add
  const addIOForm: addIOForm = useCallback((type, processIndex, key) => {
    if (key) {
      setChildIoForms((prev) => {
        const clone = JSON.parse(JSON.stringify(prev));
        clone[key].push({
          ...ioFormInitialValue,
          id: v4(),
          formType: type === "inputs" ? "input" : "output",
        });
        return clone;
      });
      return;
    }
    setProcesses((prev) => {
      prev = structuredClone(prev);
      const temp = prev[processIndex][type];
      temp.push({
        ...ioFormInitialValue,
        id: v4(),
        formType: type === "inputs" ? "input" : "output",
      } as never);
      prev[processIndex][type] = temp;
      return prev;
    });
  }, []);

  // NodeProcess Form input and output remove
  const removeIOForm: removeIOForm = useCallback(
    (type, processIndex, ioIndex) => {
      const tempProcess = processes[processIndex];
      const tempIOForm = processes[processIndex][type][ioIndex];
      if (tempProcess.id && tempIOForm.id) removeChildForm(tempIOForm.id);
      removedItems.current.formData.push({
        id: tempIOForm.id,
        processId: tempProcess.id,
      } as never);
      setProcesses((prev) => {
        prev = structuredClone(prev);
        prev[processIndex][type] = prev[processIndex][type].filter(
          (_e: any, i: number) => i !== ioIndex
        );
        return prev;
      });
    },
    []
  );

  // to remove childIOforms
  const removeChildForm = useCallback((key: string, index?: number) => {
    setChildIoForms((prev) => {
      const clone = JSON.parse(JSON.stringify(prev));
      if (index) {
        removedItems.current.formData.push({
          id: clone[key][index].id,
        } as never);
        clone[key] = clone[key].filter((_e: any, i: number) => i !== index);
      } else {
        delete clone[key];
      }
      return clone;
    });
  }, []);

  // handling value changes both formData and nodeprocess forms
  const handleChange: handleChange = useCallback(
    ({ name, value, processIndex, ioIndex, type }) => {
      if (processIndex !== undefined) {
        setProcesses((prev: any) => {
          prev = structuredClone(prev);

          const processIoValue =
            processIndex !== undefined &&
            ioIndex !== undefined &&
            type !== undefined;

          if (processIoValue) {
            // console.log(name,value,prev[processIndex][type][ioIndex].id)
            const isValidName = name === "dataType" && value === "object";
            if (isValidName) {
              setChildIoForms((preChild) => {
                const data =
                  preChild[prev[processIndex][type][ioIndex].id] ?? [];
                preChild[prev[processIndex][type][ioIndex].id] = [
                  ...data,
                  {
                    ...ioFormInitialValue,
                    id: v4(),
                    formType: type === "inputs" ? "input" : "output",
                  },
                ];
                return preChild;
              });
            } else if (name === "dataType") {
              setChildIoForms((childPrev) => {
                if (childPrev[prev[processIndex][type][ioIndex].id])
                  delete childPrev[prev[processIndex][type][ioIndex].id];
                return childPrev;
              });
            }
            prev[processIndex][type][ioIndex] = {
              ...prev[processIndex][type][ioIndex],
              [name]: value,
            };
          } else prev[processIndex] = { ...prev[processIndex], [name]: value };

          return prev;
        });
      } else {
        setformData((pre) => ({ ...pre, [name]: value }));
      }
    },
    []
  );

  const handleChildChange = useCallback(
    ({
      key,
      index,
      name,
      value,
    }: {
      key: string;
      index: number;
      name: string;
      value: string;
    }) => {
      setChildIoForms((preChild) => {
        const clone = JSON.parse(JSON.stringify(preChild));
        const temp = clone[key] ?? [];
        temp[index] = { ...temp[index], [name]: value };
        clone[key] = temp;
        return clone;
      });
    },
    []
  );

  // Handling onSubmit event and upsertion
  const handleSubmit = useCallback(async () => {
    if (!processId) {
      alert("Please Ensure payload contains ProcessId");
      return;
    }
    console.log(
      formData,
      childIoForms,
      processes,
      removedItems.current,
      processId
    );
    const error = await validateForm({ processes, ...formData });
    if (Object.keys(error).length) {
      seterrors(error);
      toast({
        title: "Error",
        variant: "destructive",
        description: "Please Ensure All the Mandatory fields are entered",
      });
      return;
    }
    await upsertDefaultNode({
      ...formData,
      processes,
      processId,
      childIoForms,
      removedItems: removedItems.current,
    });
    toast({ title: "Success", description: "Node Data Updated Successfully" });
    setformData(initProcessValues.formData);
    setProcesses(initProcessValues.processes);
    navigate.back();
  }, [processes, formData, childIoForms]);

  // initialize with existing data
  const setData = (data: any) => {
    if (Object.keys(data).length) {
      const { processes = [], childIoForms = {}, ...rest } = data;
      setformData(rest);
      setChildIoForms(childIoForms);
      setProcesses(processes);
    } else {
      setformData(initProcessValues.formData);
      setProcesses(initProcessValues.processes);
    }
  };
  // to validate formdata with schema
  const { validateForm } = useFormik({
    initialValues: { ...formData, processes },
    onSubmit: () => {},
    validationSchema: schema,
  });
  return (
    <NodeProcessContext.Provider
      value={{
        processes,
        childIoForms,
        formData,
        errors,
        removeChildForm,
        handleChildChange,
        addIOForm,
        addProcess,
        handleChange,
        handleSubmit,
        removeIOForm,
        removeProcess,
        setData,
      }}
    >
      {children}
    </NodeProcessContext.Provider>
  );
};

export default NodeProcessContextProvider;
