import { FC, memo, useContext } from "react";
import { NodeProcessContext } from "@/context/processContext";
import { Button, Input } from "@/components/ui";
import FormCreator from "./ioFormCreator";

const Process: FC<{ nodeId: string; index: number }> = ({
  index: processIndex,
}) => {
  const { processes, addIOForm, handleChange } = useContext(NodeProcessContext);
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
          className=" p-4 mt-5 flex flex-col gap-2 w-auto"
          style={{
            border: "1px solid #CCCCCC",
          }}
        >
          <div className="font-[700] text-[16px] mb-3">Output Form*</div>

          {processes[processIndex].outputs.map((output, ioIndex) => {
            return (
              <FormCreator
                key={output.id}
                handleChange={handleChange}
                data={output}
                id={output.id}
                processIndex={processIndex}
                ioIndex={ioIndex}
                type="outputs"
                isChild={false}
              />
            );
          })}
        </div>
        <Button
          style={{
            padding: "0.5rem 1rem",
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
        className=" p-4 mt-5 flex flex-col gap-2 w-auto"
        style={{
          border: "1px solid #CCCCCC",
        }}
      >
        <div className="font-[700] text-[16px] mb-3">Input Form*</div>
        {processes[processIndex].inputs.map((input: any, ioIndex: number) => {
          return (
            <FormCreator
              key={input.id}
              handleChange={handleChange}
              data={input}
              id={input.id}
              processIndex={processIndex}
              ioIndex={ioIndex}
              type="inputs"
              isChild={false}
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

export default memo(Process);
