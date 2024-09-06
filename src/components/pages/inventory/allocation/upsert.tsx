import { ChangeEventHandler, useEffect, useState } from "react";

import {
  getTrackingOptions,
  getNodeOptions,
  getInventoryTracking,
  createInventoryTracking,
} from "@/shared/api";
import { useRouter, useParams } from "next/navigation";
import DropDown from "@/components/ui/dropdown";
import { Input } from "@/components/ui";

const AdjustStockForm = () => {
  const navigate = useRouter();
  const { productId, processId } = useParams();
  const [formData, setformData] = useState<any>({});
  const [nodeOptions, setnodeOptions] = useState([]);
  const [trackingOptions, settrackingOptions] = useState([]);

  const handleFetch = async () => {
    try {
      if (processId) {
        const {
          data: { data: trackingData },
        } = await getInventoryTracking({ processId });
        const { adjustedQuantity, ...rest } = trackingData;
        setformData({ ...rest, newQuantity: rest.quantity });
      }
      const { data } = await getTrackingOptions();
      settrackingOptions(data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFetchNodeOptions = async (processId: string) => {
    try {
      const { data } = await getNodeOptions({ processId });
      setnodeOptions(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  useEffect(() => {
    if (formData?.processId) handleFetchNodeOptions(formData.processId);
  }, [formData?.processId]);

  const handleAdjust = async () => {
    try {
      const { newQuantity, ...rest } = formData;
      const payload = {
        ...rest,
        quantity: newQuantity,
        modifiedBy: "b64f413b-c0c6-4b79-b918-68fef0679649",
        transactional: true,
        latest: true,
        productId,
      };
      await createInventoryTracking(payload);
      navigate.back();
      navigate;
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    const data = { [name]: value };
    if (name === "adjustedQuantity") {
      data["newQuantity"] = (Number(formData?.quantity || 0) +
        Number(value)) as any;
    }
    if (name === "newQuantity") {
      data["adjustedQuantity"] = (Number(value) -
        Number(formData?.quantity || 0)) as any;
    }
    setformData((pre: any) => ({ ...pre, ...data }));
  };

  return (
    <div className="">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col gap-5">
        <h2 className="text-xl font-bold mb-4">Adjust Stock - Tobacco</h2>
        <div className="grid grid-cols-2 gap-10">
          <DropDown
            name="processId"
            options={trackingOptions}
            // fieldStyle={{ border: "1px solid #CCCCCC" }}
            label="Process"
            placeholder="Select Tracking"
            onChange={(e: any) =>
              setformData((prev: any) => ({ ...prev, processId: e.value }))
            }
            isDisabled={!!processId}
            value={trackingOptions.find(
              (e: any) => e.value === formData.processId
            )}
          />
          <DropDown
            name="nodeId"
            options={nodeOptions}
            // fieldStyle={{ border: "1px solid #CCCCCC" }}
            label="Node"
            placeholder="Select Node"
            onChange={(e) => console.log(e)}
            isDisabled={!!processId}
            // value={{ nodeId: formData?.nodeId }}
          />
        </div>
        <div className="grid grid-cols-2 gap-10">
          <DropDown
            name="reason"
            options={[{ label: "New", value: "Newly Added" }]}
            // ={{ border: "1px solid #CCCCCC" }}
            label="Reason"
            placeholder="Select Node"
            // handleChange={handleChange}
            // value={{ reason: formData?.reason }}
          />
          <Input
            name="quantity"
            type="number"
            readOnly={true}
            style={{ border: "1px solid #CCCCCC" }}
            label="Current Quantity"
            onChange={handleChange}
            value={formData?.quantity || 0}
          />
        </div>
        <div className="grid grid-cols-2 gap-10">
          <Input
            name="adjustedQuantity"
            type="number"
            style={{ border: "1px solid #CCCCCC" }}
            label="Adjusted Quantity"
            onChange={handleChange}
            value={formData?.adjustedQuantity || 0}
          />
          <Input
            name="newQuantity"
            type="number"
            style={{ border: "1px solid #CCCCCC" }}
            label="New Quantity"
            onChange={handleChange}
            value={formData?.newQuantity || 0}
          />
        </div>
        <Input
          name="remarks"
          style={{ border: "1px solid #CCCCCC" }}
          label="Remarks"
          onChange={handleChange}
          value={formData?.remarks}
        />
        <div className="flex items-center justify-between">
          <button
            type="button"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleAdjust}
          >
            Adjusted
          </button>
          <button
            type="button"
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => navigate.push(`/inventory/${productId}/storage`)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdjustStockForm;
