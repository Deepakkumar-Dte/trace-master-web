import DropDown from "@/components/ui/dropdown";
import { GlobalContext } from "@/context/globalContext";
import React, { useContext } from "react";

const typeOptions = [
  { label: "Inventory", value: "inventory" },
  { label: "Lookup", value: "lookup" },
];

const IoDropDownType = ({ data, handleChange }: any) => {
  const { categoryList } = useContext(GlobalContext);
  return (
    <div className="grid grid-cols-3 gap-5">
      <DropDown
        label="Type"
        options={typeOptions}
        onChange={(e: any) => handleChange("type", e.value)}
        value={typeOptions.find((e) => e.value === data.type)}
      />
      <DropDown
        label="Lookup"
        options={categoryList}
        onChange={(e: any) => handleChange("lookupId", e.value)}
        value={typeOptions.find((e) => e.value === data.lookupId)}
      />
      {data.type === "inventory" && (
        <DropDown
          label="LookupValue"
          options={typeOptions}
          onChange={(e: any) => handleChange("lookupValueId", e.value)}
          value={typeOptions.find((e) => e.value === data.lookupValueId)}
        />
      )}
    </div>
  );
};

export default IoDropDownType;
