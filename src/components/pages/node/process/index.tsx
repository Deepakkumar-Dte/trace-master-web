import { FC, useContext } from "react";
import { Ioform } from "@/components/custom";
import { NodeProcessContext } from "@/context/processContext";
import { Button, Input } from "@/components/ui";

const Process: FC<{ nodeId: string; index: number }> = ({
  index: processIndex,
}) => {
  const { processes, addIOForm, removeIOForm, handleChange } =
    useContext(NodeProcessContext);

  return (
    <>
      <div className="form-group">
        <Input
          required
          label="Process Name"
          name="name"
          className="pl-0 pr-0"
          value={processes[processIndex].name}
          onChange={(e) =>
            handleChange({
              name: "name",
              value: e.target.value,
              processIndex,
            })
          }
        />
        <div
          className=" p-4 mt-5 flex flex-col gap-5 overflow-x-scroll w-auto"
          style={{
            border: "1px solid #CCCCCC",
          }}
        >
          <div className="font-[700] text-[16px] mb-3">Output Form*</div>
          {processes[processIndex].outputs.map(
            (output: any, ioIndex: number) => {
              return (
                <Ioform
                  key={`${processIndex}:${ioIndex}`}
                  handleBlur={() => {}}
                  data={output}
                  handleChange={(name, value) =>
                    handleChange({
                      name,
                      value,
                      processIndex,
                      ioIndex,
                      type: "outputs",
                    })
                  }
                  handleRemove={() => {
                    removeIOForm("outputs", processIndex, ioIndex);
                  }}
                  id={output.formId}
                  index={ioIndex}
                />
              );
            }
          )}
        </div>
        <Button
          style={{
            padding: " 0.5rem 1rem",
            margin: "1rem 0",
          }}
          onClick={() => {
            addIOForm("outputs", processIndex);
          }}
        >
          Add Field
        </Button>
      </div>
      <div
        className=" p-4 mt-5 flex flex-col gap-5 overflow-x-scroll w-auto"
        style={{
          border: "1px solid #CCCCCC",
        }}
      >
        <div className="font-[700] text-[16px] mb-3">Input Form*</div>
        {processes[processIndex].inputs.map((input: any, ioIndex: number) => {
          return (
            <Ioform
              key={`${processIndex}:${ioIndex}`}
              handleBlur={() => {}}
              data={input}
              handleChange={(name, value) =>
                handleChange({
                  name,
                  value,
                  processIndex,
                  ioIndex,
                  type: "inputs",
                })
              }
              handleRemove={() => {
                removeIOForm("inputs", processIndex, ioIndex);
              }}
              id={input.formId}
              index={ioIndex}
            />
          );
        })}
      </div>
      <Button
        style={{
          padding: " 0.5rem 1rem",
          margin: "1rem 0",
        }}
        onClick={() => {
          addIOForm("inputs", processIndex);
        }}
      >
        Add Field
      </Button>
      <div className="form-group">
        <label>Process Script*</label>
        <div className="script-wrapper">
          {`function script(inputs, outputs){`}
          <textarea
            value={processes[processIndex].script}
            onChange={(e) =>
              handleChange({
                name: "script",
                value: e.target.value,
                processIndex,
              })
            }
            required
          ></textarea>
          {`}`}
        </div>
      </div>
    </>
  );
};

export default Process;
