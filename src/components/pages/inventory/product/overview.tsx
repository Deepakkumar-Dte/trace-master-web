'use client'
import { Button, Tabs } from "@/components/ui";
import { Suspense } from "react";
import { Spinner } from "@/components/ui";
import { useParams, useRouter } from "next/navigation";
import { useFetch } from "@/customeHooks";
import { getProductDetails } from "@/shared/api";

const Overview = () => {
  const navigate = useRouter();
  const { productId } = useParams();
  const tabList = [
    {
      label: "Overview",
      content: () => <Component />,
      navigateTo: "overview",
    },
    {
      label: "Transaction",
      content: () => <></>,
      navigateTo: "transaction",
    },
    {
      label: "history",
      content: () => <></>,
      navigateTo: "history",
    },
  ];

  return (
    <Suspense fallback={<Spinner />}>
      <div className="">
        <Button
          className="btn-back text-white px-4 py-2 rounded"
          onClick={() => navigate.back()}
        >
          Back
        </Button>
        <div className="bg-white p-6 mt-4 shadow-md rounded-md">
          <div className="flex justify-end items-center h-16">
            <div>
              <Button
                className="btn-edit px-4 py-2 rounded mx-2"
                onClick={() => navigate.push(`/inventory/${productId}/edit`)}
              >
                Edit
              </Button>
              <Button
                className="btn-adjust-stock px-4 py-2 rounded"
                onClick={() => navigate.push(`/inventory/${productId}/adjust`)}
              >
                Adjust Stock
              </Button>
            </div>
          </div>
          <Tabs
            tabs={tabList}
            active={0}
            onClick={(label) => {
              navigate.push(`/inventory/${productId}/${label}`);
            }}
          />
        </div>
      </div>
    </Suspense>
  );
};

export const Component = () => {
  const navigate = useRouter();
  const { productId } = useParams();
  const api = {
    productData: getProductDetails,
  };
  const payload = {
    productData: [productId],
  };
  const [loading, { productData: data }] = useFetch(api, payload);
  console.log(data);
  if (loading) return <Spinner />;
  return (
    <div className="grid grid-cols-3 gap-4 mt-4">
      <div className="col-span-2">
        <div className="grid grid-cols-2 gap-10">
          <div className="field flex justify-between">
            <strong>Product Name:</strong>{" "}
            <div className="pr-10 font-medium text-[16px]">{data.name}</div>
          </div>
          <div className="field flex justify-between">
            <strong>SKU:</strong>{" "}
            <div className="pr-10 font-medium text-[16px]">{data.sku}</div>
          </div>
          <div className="field flex justify-between">
            <strong>Category:</strong>{" "}
            <div className="pr-10 font-medium text-[16px]">
              {data.categoryLabel}
            </div>
          </div>
          <div className="field flex justify-between">
            <strong>Sub Category:</strong>{" "}
            <div className="pr-10 font-medium text-[16px]">
              {data.subCategoryLabel ?? "-"}
            </div>
          </div>
          <div className="field flex justify-between">
            <strong>Unit:</strong>{" "}
            <div className="pr-10 font-medium text-[16px]">
              {data.secondryUnit
                ? `1 ${data.baseUnitLabel} = ${data.convertionRate || 0} ${
                    data.secondryUnitLabel
                  }`
                : data.baseUnitLabel}
            </div>
          </div>
          <div className="field flex  col-span-2">
            <strong>Description:</strong>
            <p className="px-5">{data.description}</p>
          </div>
        </div>
      </div>
      <div className="col-span-1">
        <img
          src="https://via.placeholder.com/150"
          alt="Tobacco"
          className="rounded-md shadow-md"
        />
      </div>
    </div>
  );
};

export default Overview;
