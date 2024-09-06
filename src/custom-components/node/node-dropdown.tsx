import { ClassicPreset } from "rete";
import { Select } from "../inputComponents";
import { ChangeEvent } from "react";
export class DropDown extends ClassicPreset.Control {
  label: string = "";
  options: any = [];
  onChange: any = null;
  public value: string | number = "";
  constructor(
    id: string,
    label: string,
    options: any,
    onChange: any,
    value: any
  ) {
    super();
    this.id = id;
    this.label = label;
    this.onChange = onChange;
    this.options = options;
    this.value = value;
  }
}

export const CustomeDropDown = ({ data }: any) => {
  const { label, options, value, onChange } = data;
  return (
    <Select
      onPointerDown={(e) => e.stopPropagation()}
      onDoubleClick={(e) => e.stopPropagation()}
      labelname={label}
      data={options}
      fieldStyle={{ border: "1px solid green" }}
      value={{ user: value } as any}
      name="user"
      handleChange={(e: ChangeEvent<HTMLSelectElement>) => {
        onChange(e.target.value);
      }}
      placeHolderText="Select"
      labelStyle={{ marginBottom: "0", fontWeight: 600 }}
    />
  );
};
