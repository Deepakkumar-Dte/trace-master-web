/* eslint-disable @typescript-eslint/no-explicit-any */
import DropDown from "@/components/ui/dropdown";
import { GlobalContext, ListType } from "@/context/globalContext";
import { getLookupList } from "@/shared/api";
import React, { useCallback, useContext, useEffect, useState } from "react";

const typeOptions = [
  { label: "Inventory", value: "inventory" },
  { label: "Lookup", value: "lookup" },
];

const IoDropDownType = ({ data, handleChange }: any) => {
  const { categoryList } = useContext(GlobalContext);
  const [subCategoryList, setsubCategoryList] = useState<ListType>([]);
  const fetchSubCategory = useCallback(
    async (categoryId: string) => {
      const { data } = await getLookupList({
        lookupId: categoryId,
        forLookupValue: true,
      });
      setsubCategoryList(data);
    },
    []
  );

  useEffect(() => {
    if (data.lookupId) {
      fetchSubCategory(data.lookupId);
    }
  }, [data.lookupId]);
  console.log(data.type)
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
        value={categoryList.find((e) => e.value === data.lookupId)}
      />
      {data.type === "inventory" && (
        <DropDown
          label="LookupValue"
          options={subCategoryList}
          onChange={(e: any) => handleChange("lookupValueId", e.value)}
          value={subCategoryList.find((e) => e.value === data.lookupValueId)}
        />
      )}
    </div>
  );
};

export default IoDropDownType;
