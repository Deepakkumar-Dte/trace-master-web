import { AccordionCollapse } from "@/assets/icons";
import { Ioform } from "@/components/custom";
import IoDropDownType from "@/components/custom/node/IoDropDownType";
import { Button } from "@/components/ui";
import { IoFormArgs, NodeProcessContext } from "@/context/processContext";
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionContent,
} from "@radix-ui/react-accordion";
import { memo, useContext } from "react";

interface FormCreator {
  processIndex: number;
  ioIndex: number;
  data: IoFormArgs;
  handleChange: (arg: any) => void;
  type: "inputs" | "outputs";
  isChild?: boolean;
  id: string;
}

const FormCreator = ({
  processIndex,
  ioIndex,
  data,
  handleChange,
  type,
  isChild = false,
  id,
}: FormCreator) => {
  const {
    childIoForms,
    handleChildChange,
    addIOForm,
    removeChildForm,
    removeIOForm,
  } = useContext(NodeProcessContext);

  if (!childIoForms[data.id] && data.dataType !== "dropdown")
    return (
      <Ioform
        key={`${processIndex}:${ioIndex}`}
        handleBlur={() => {}}
        data={data}
        isChild={isChild}
        handleChange={(name, value) =>
          handleChange({
            name,
            value,
            processIndex,
            ioIndex,
            type,
          })
        }
        handleRemove={() => {
          isChild
            ? removeChildForm(id, ioIndex)
            : removeIOForm(type, processIndex, ioIndex);
        }}
        id={data.id ?? ""}
        index={ioIndex}
      />
    );
  return (
    <Accordion key={Symbol(processIndex).toString()} type="single" collapsible>
      <AccordionItem
        value={ioIndex.toString()}
        className="bg-[#F2F4F5] p-4 rounded"
      >
        <AccordionHeader className="relative">
          <Ioform
            isChild={isChild}
            key={`${processIndex}:${ioIndex}`}
            handleBlur={() => {}}
            data={data}
            handleChange={(name, value) =>
              handleChange({
                name,
                value,
                processIndex,
                ioIndex,
                type,
              })
            }
            handleRemove={() => {
              isChild
                ? removeChildForm(id, ioIndex)
                : removeIOForm(type, processIndex, ioIndex);
            }}
            id={data.id ?? ""}
            index={ioIndex}
          />
          <AccordionTrigger className="absolute left-[-30px] top-[50%]">
            <AccordionCollapse />
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent>
          {data.dataType === "object" ? (
            <>
              {Array.from(childIoForms[data.id] ?? [], (values, index) => {
                return (
                  <FormCreator
                    key={values.id}
                    handleChange={({ name, value }) => {
                      handleChildChange({ name, value, key: data.id, index });
                    }}
                    id={id}
                    data={values}
                    processIndex={processIndex}
                    ioIndex={index}
                    isChild={true}
                    type={type}
                  />
                );
              })}
              <Button
                onClick={() => {
                  addIOForm(type, 0, data.id);
                }}
              >
                Add Field
              </Button>
            </>
          ) : (
            <IoDropDownType
              handleChange={(name: string, value: string) =>
                handleChange({
                  name,
                  value,
                  processIndex,
                  ioIndex,
                  type: "outputs",
                })
              }
              data={data}
            />
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default memo(FormCreator);
