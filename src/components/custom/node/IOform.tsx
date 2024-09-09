'use client'
import { FormikHandlers } from "formik";
import { dataTypeOptions } from "../../../shared/config";
import { Input } from "@/components/ui";
import DropDown from "@/components/ui/dropdown";
import { Switch } from "@/components/ui/switch";
import { memo } from "react";

type props = {
  id: string;
  index: number;
  data: {
    label: string | null;
    variableName: string | null;
    dataType: string | null;
    type: "input" | "output";
    required: boolean;
  };
  handleBlur: FormikHandlers["handleBlur"];
  handleChange: (name: string, value: any) => void;
  handleRemove: (index: number, type: "inputs" | "outputs") => void;
  error?: any;
};

const IoFrom = ({
  id,
  data,
  handleBlur,
  handleChange,
  handleRemove,
  error = {},
  index,
}: props) => {
  const formType = data.type === "input" ? "inputs" : "outputs";
  return (
    <div key={id} className="flex justify-between items-center gap-x-8">
      <div className="w-full">
        <Input
          className={` py-0 pt-2`}
          required
          label={"Label"}
          name={"label"}
          value={data.label || ""}
          onBlur={handleBlur}
          //   touched={true}
          onChange={(e: any) => {
            handleChange("label", e.target.value);
          }}
          placeholder="Type Label name here"
          style={{
            background: "white",
          }}
        />
      </div>
      <div className="w-full">
        <Input
          className={` py-0 pt-2`}
          required
          label={"Variable name"}
          name={"variableName"}
          value={data.variableName || ""}
          onBlur={handleBlur}
          onChange={(e: any) => {
            handleChange(`variableName`, e.target.value);
          }}
          placeholder="Type variable name here"
          style={{
            background: "white",
          }}
        />
      </div>
      <div className="w-full mt-3">
        <DropDown
          name={"dataType"}
          value={dataTypeOptions.find((e) => e.value === data.dataType) || null}
          options={dataTypeOptions}
          label="Data Type"
          placeholder={"Select Here"}
          onChange={(e: any) => {
            console.log(e);
            handleChange(`dataType`, e.value);
          }}
        />
      </div>
      <div className="flex flex-col items-center gap-3 mt-6">
        <label>Required</label>
        <Switch
          onClick={(e) => {
            handleChange("required", !data.required);
          }}
        />
      </div>
      <div className="mt-6">
        <svg
          onClick={() => handleRemove(index, formType)}
          width="25"
          height="26"
          viewBox="0 0 25 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            y="0.5"
            width="25"
            height="24.9997"
            rx="12.4998"
            fill="#F75656"
          />
          <path
            d="M5.8335 8.83301H19.1668M10.8335 12.167V17.167M14.1665 12.167V17.167M6.6665 8.83301L7.49984 18.833C7.49984 19.275 7.67543 19.699 7.98799 20.0115C8.30055 20.3241 8.72448 20.4997 9.1665 20.4997H15.8332C16.2752 20.4997 16.6991 20.3241 17.0117 20.0115C17.3242 19.699 17.4998 19.275 17.4998 18.833L18.3332 8.83301M10 8.83333V6.33333C10 6.11232 10.0878 5.90036 10.2441 5.74408C10.4004 5.5878 10.6123 5.5 10.8333 5.5H14.1667C14.3877 5.5 14.5996 5.5878 14.7559 5.74408C14.9122 5.90036 15 6.11232 15 6.33333V8.83333"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default memo(IoFrom);
