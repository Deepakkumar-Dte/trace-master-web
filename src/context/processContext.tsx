import { useFormik } from "formik";
import { upsertDefaultNode } from "../shared/api";
import { createContext, useRef, useState } from "react";
import { schema } from "../shared/validation_schema/node";
import { useParams, useRouter } from "next/navigation";

type removeProcess = (index: number) => void;
type addIOForm = (type: "inputs" | "outputs", processIndex: number) => void;
type removeIOForm = (
  type: "inputs" | "outputs",
  processIndex: number,
  ioIndex: number
) => void;
type handleChange = (arg: {
  name: string;
  value: any;
  processIndex?: number;
  ioIndex?: number;
  type?: "inputs" | "outputs";
}) => void;

const ioFormInitialValue = {
  label: "",
  variableName: "",
  dataType: "",
  required: false,
  processId: null,
};

const initProcessValues = {
  setData: (_arg: any) => {},
  processes: [
    {
      inputs: [] as any,
      outputs: [] as any,
      name: "",
      script: "",
      id: null,
    },
  ],
  formData: {
    name: "",
    description: "",
    initial: false,
  },
  addProcess: () => {},
  removeProcess: (_processIndex: number) => {},
  addIOForm: (_type: "inputs" | "outputs", _processIndex: number) => {},
  removeIOForm: (
    _type: "inputs" | "outputs",
    _processIndex: number,
    _ioIndex: number
  ) => {},
  handleChange: (_arg: {
    name: string;
    value: any;
    processIndex?: number;
    ioIndex?: number;
    type?: "inputs" | "outputs";
  }) => {},
  errors: {} as any,
  handleSubmit: () => {},
};

export const ProcessContext = createContext(initProcessValues);

export default ({ children }: any) => {
  const [processes, setProcesses] = useState(initProcessValues.processes);
  const [formData, setformData] = useState(initProcessValues.formData);
  const [errors, seterrors] = useState({});
  const removedItems = useRef({ processes: [], formData: [] });
  const { processId } = useParams();
  const navigate = useRouter();

  // Node Process Add Function
  const addProcess = () => {
    setProcesses((prev) => [...prev, initProcessValues.processes[0]]);
  };

  // Node Process removed and added into the removedItems ref
  const removeProcess: removeProcess = (index) => {
    const tempProcess = processes[index];
    if (tempProcess.id) removedItems.current.processes.push(tempProcess.id);
    removedItems.current.formData = removedItems.current.formData.filter(
      (e: any) => e.processId !== tempProcess.id
    );
    setProcesses((pre) => pre.filter((_e, i) => i !== index));
  };

  // NodeProcess Form input and output add
  const addIOForm: addIOForm = (type, processIndex) => {
    setProcesses((prev) => {
      prev = structuredClone(prev);
      const temp = prev[processIndex][type];
      temp.push({
        ...ioFormInitialValue,
        formType: type === "inputs" ? "input" : "output",
      } as never);
      prev[processIndex][type] = temp;
      return prev;
    });
  };

  // NodeProcess Form input and output remove
  const removeIOForm: removeIOForm = (type, processIndex, ioIndex) => {
    const tempProcess = processes[processIndex];
    const tempIOForm = processes[processIndex][type][ioIndex];
    if (tempProcess.id && tempIOForm.id)
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
  };

  // handling value changes both formData and nodeprocess forms
  const handleChange: handleChange = ({
    name,
    value,
    processIndex,
    ioIndex,
    type,
  }) => {
    if (processIndex !== undefined) {
      setProcesses((prev: any) => {
        prev = structuredClone(prev);

        const processIoValue =
          processIndex !== undefined &&
          ioIndex !== undefined &&
          type !== undefined;

        switch (true) {
          case processIoValue:
            prev[processIndex][type][ioIndex] = {
              ...prev[processIndex][type][ioIndex],
              [name]: value,
            };
            break;
          default:
            prev[processIndex] = { ...prev[processIndex], [name]: value };
        }
        return prev;
      });
    } else {
      setformData((pre) => ({ ...pre, [name]: value }));
    }
  };

  // Handling onSubmit event and upsertion
  const handleSubmit = async () => {
    if (!processId) {
      alert("Please Ensure payload contains ProcessId");
      return;
    }
    const error = await validateForm({ processes, ...formData });
    if (Object.keys(error).length) {
      seterrors(error);
      console.log(error);
      return;
    }
    await upsertDefaultNode({
      ...formData,
      processes,
      processId,
      removedItems: removedItems.current,
    });
    alert("Node Added Successfully");
    setformData(initProcessValues.formData);
    setProcesses(initProcessValues.processes);
    navigate.back();
  };

  // initialize with existing data
  const setData = (data: any) => {
    const { processes = [], ...rest } = data;
    setformData(rest);
    setProcesses(processes);
  };
  // to validate formdata with schema
  const { validateForm } = useFormik({
    initialValues: { ...formData, processes },
    onSubmit: () => {},
    validationSchema: schema,
  });
  return (
    <ProcessContext.Provider
      value={{
        processes,
        formData,
        errors,
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
    </ProcessContext.Provider>
  );
};
