'use client'
import { Button, DataTable, Spinner, Tabs } from "@/components/ui";
import DropDown from "@/components/ui/dropdown";
import { useFetch } from "@/customeHooks";
import { getHistory } from "@/shared/api";
import { DateTime } from "luxon";
import { useParams, useRouter } from "next/navigation";
import { Suspense } from "react";

export const History = () => {
  const { productId } = useParams();
  const [loading, data] = useFetch(
    { history: getHistory },
    { history: [{ productId }] }
  );
  if (loading) return <Spinner />;
  return (
    <div className="h-full">
        <DataTable
          columns={[
            {
              accessorKey: "createdAt",
              header: "Date",
              cell: ({ getValue }) =>
                DateTime.fromISO(getValue() as string).toFormat(
                  "yyyy - MMM - dd"
                ),
            },
            { accessorKey: "nodeTitle", header: "Node Name" },
            { accessorKey: "processTitle", header: "Process Name" },
            { accessorKey: "reason", header: "Reason" },
            { accessorKey: "adjustedQuantity", header: "Adjusted Quantiy" },
            { accessorKey: "quantity", header: "Current In Stock" },
            { accessorKey: "modifiedBy", header: "Modified By" },
          ]}
          data={data ? data.history : []}
        />
      </div>
  );
};

const ProductHistory = () => {
  const navigate = useRouter();
  const { productId } = useParams();
  const tabList = [
    {
      label: "Overview",
      content: () => <></>,
      navigateTo: "overview",
    },
    {
      label: "Transaction",
      content: () => <></>,
      navigateTo: "transaction",
    },
    {
      label: "history",
      content: () => <History />,
      navigateTo: "history",
    },
  ];

  return (
    <Suspense fallback={<Spinner />}>
      <div className="h-full">
        <Button
          className="btn-back px-4 py-2 rounded"
          onClick={() => navigate.back()}
        >
          Back
        </Button>
        <div className="bg-white p-6 mt-[20px] shadow-md rounded-md product-details">
          <div className="flex justify-between items-center h-16">
            <h1 className="font-semibold flex justify-center items-center text-xl">
              Product Name
            </h1>
            <DropDown
              name={""}
              options={[]}
              // handleChange={undefined}
              // placeHolderText={"Blend Name"}
            />
          </div>
          <Tabs
            tabs={tabList}
            active={2}
            onClick={(label) => {
              navigate.push(`/inventory/${productId}/${label}`);
            }}
          />
        </div>
      </div>
    </Suspense>
  );
};

export default ProductHistory;
