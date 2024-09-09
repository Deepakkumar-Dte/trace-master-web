import { ChangeEventHandler, useCallback, useEffect, useState } from "react";
import { getTrackingData, upsertTracking } from "@/shared/api";
import { useParams, useRouter } from "next/navigation";
import { Button, Input } from "@/components/ui";
import { BiLeftArrow } from "react-icons/bi";
import { useToast } from "@/components/ui/use-toast";

const Upsert = () => {
  const { toast } = useToast();
  const navigate = useRouter();
  const { processId } = useParams();
  const [formData, setformData] = useState<any>({ title: "", description: "" });

  const fetch = useCallback(async (processId: string) => {
    const data = await getTrackingData(processId);
    setformData(data.data);
  }, []);

  useEffect(() => {
    if (processId && typeof processId === "string") {
      fetch(processId);
    }
  }, []);

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      const payload = processId ? { ...formData, id: processId } : formData;
      console.log(payload);
      await upsertTracking(payload);
      handleCancel();
      toast({
        title: "Process Upsertion",
        description: "procress data upsertion completed successfully",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancel = () => {
    setformData({});
    navigate.push("/process");
  };

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    const { name, value } = e.target;
    setformData((pre: any) => ({ ...pre, [name]: value }));
  };

  return (
    <div>
      <Button variant={"secondary"} onClick={handleCancel}>
        <BiLeftArrow /> &nbsp; Back
      </Button>
      <h2 className="headerStyle my-6">Create Tracking</h2>
      <form
        className="create-tracking-form bg-white p-6 rounded-[5px] gap-5 flex flex-col"
        onSubmit={handleSubmit}
      >
        <div className="form-group">
          <Input
            label="Tracking Name"
            type="text"
            name="title"
            value={formData?.title}
            placeholder="Tracking Name"
            required={true}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <Input
            placeholder="Enter the Description"
            type="text"
            label="Desctiption"
            value={formData?.description}
            name="description"
            onChange={handleChange}
            className="h-[100px] align-start"
          />
        </div>
        <div className="flex gap-5">
          <Button
            type="button"
            className="bg-none"
            onClick={handleCancel}
            variant={"secondary"}
          >
            Cancel
          </Button>
          <Button type="submit" className="">
            {processId ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Upsert;
