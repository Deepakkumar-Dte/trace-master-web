"use client";
import {
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getNodeData } from "@/shared/api";
import Process from "./process";
import { NodeProcessContext } from "@/context/processContext";
import { useParams, useRouter } from "next/navigation";
import { Button, Input, Spinner, Tabs } from "@/components/ui";
import { BiLeftArrow } from "react-icons/bi";
import { ComponentTitleBar } from "@/components/custom";

const Upsert = () => {
  const {
    processes,
    addProcess,
    removeProcess,
    handleSubmit,
    handleChange,
    formData,
    setData,
  } = useContext(NodeProcessContext);
  const [isLoading, setIsLoading] = useState(true);

  const fetchNodeData = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await getNodeData(nodeId as string);
      setData(data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (nodeId) fetchNodeData();
    else {
      setIsLoading(false);
    }
  }, []);

  const navigate = useRouter();
  const { processId, nodeId } = useParams();

  const title = useMemo(() => {
    const prefix = processId ? "Process" : "";
    const title = nodeId ? "Node Creation" : "Node Updation";
    return `${prefix} ${title}`;
  }, []);

  if (isLoading) return <Spinner />;

  return (
    <div className="h-full flex flex-col gap-y-4 overflow-y-auto">
      <Button
        style={{
          width: "90px",
          padding: "0.5rem 1rem",
        }}
        onClick={() => {
          navigate.back();
        }}
      >
        <BiLeftArrow /> &nbsp;Back
      </Button>

      <ComponentTitleBar title={title} />
      <div className="bg-white p-[2rem]">
        <div className="form-group">
          <Input
            label={"Node Name"}
            onChange={(e) =>
              handleChange({ name: "name", value: e.target.value })
            }
            name={"name"}
            value={formData.name}
            placeholder="Enter here..."
            required
          />
        </div>
        <div className="form-group">
          <Input
            required
            label="Description"
            value={formData.description}
            name="description"
            onChange={(e) =>
              handleChange({ name: "description", value: e.target.value })
            }
            placeholder="Enter here..."
          />
        </div>

        <Tabs
          tabs={processes.map((e, i) => ({
            element: <Process nodeId="" index={i} key={"Process" + i} />,
            label: `Process ${i + 1}`,
            navigateTo: "",
          }))}
          onRemove={(index) => {
            if (processes.length > 1) removeProcess(index);
          }}
          active={0}
          Suffix={
            <button
              className={`px-4 py-2 mr-2 bg-[#800020] text-[white] rounded`}
              onClick={() => {
                addProcess();
              }}
            >
              Add Process
            </button>
          }
        />
        <div className="mx-4">
          <label>
            Initial Node &nbsp;
            <input
              type="checkbox"
              checked={formData.initial}
              onChange={({ target: { checked } }) => {
                handleChange({ name: "initial", value: checked });
              }}
            />
          </label>
        </div>
        <div className="form-actions flex justify-start m-4 mt-12 gap-x-8">
          <Button
            style={{
              background: "var(--cancelButton)",
              width: "7.5rem",
              height: "2.75rem",
              padding: "1rem",
              borderRadius: "5px",
            }}
            onClick={() => {
              setData({});
            }}
          >
            Cancel
          </Button>
          <Button
            style={{
              width: "7.5rem",
              height: "2.75rem",
              padding: "1rem",
              borderRadius: "5px",
            }}
            onClick={() => {
              handleSubmit();
            }}
          >
            {" "}
            {nodeId ? "Update" : "Create"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default memo(Upsert);
