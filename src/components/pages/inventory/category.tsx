import { Button, Input } from "@/components/ui";
import { useState } from "react";

interface props {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const Category = ({ onSubmit, onCancel }: props) => {
  const [formData, setformData] = useState<any>({ type: "category" });
  return (
    <div className="w-full h-full">
      <div>
        <Input
          style={{ border: "1px solid #CCCCCC" }}
          name="category"
          value={formData?.category}
          label="Category"
          onChange={(e) => setformData(() => ({ name: e.target.value }))}
        />
      </div>
      <div className="flex justify-between px-3 mt-5">
        <Button
          variant="secondary"
          color="inherit"
          onClick={() => {
            onCancel();
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            onSubmit(formData);
          }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

const SubCategory = ({ onSubmit, onCancel }: any) => {
  const [formData, setformData] = useState<any>({});
  return (
    <div className="w-full h-full">
      <div>
        <Input
          style={{ border: "1px solid #CCCCCC" }}
          name="subCategory"
          value={formData?.subCategory}
          label="Sub Category"
          onChange={(e) => setformData(() => ({ value: e.target.value }))}
        />
      </div>
      <div className="flex justify-between px-3 mt-5">
        <Button
          variant="secondary"
          color="inherit"
          onClick={() => {
            onCancel();
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            onSubmit(formData);
          }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export { Category, SubCategory };
