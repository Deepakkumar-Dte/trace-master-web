'use client'
import { DateTime } from "luxon";
import { Suspense } from "react";
import { useFetch } from "@/customeHooks";
import { getTransactions } from "@/shared/api";
import { useParams, useRouter } from "next/navigation";
import { Button, DataTable, Spinner, Tabs } from "@/components/ui";
import DropDown from "@/components/ui/dropdown";

export const Transactions = () => {
  const api = { transactionData: getTransactions };
  const { productId } = useParams();
  const [isLoading, data] = useFetch(api, { transactionData: [{ productId }] });
  if (isLoading) return <Spinner />;
  return (
    <div className="h-full">
      <div className="request-management">
        <div className="table-container bg-white">
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
            data={(data ?? {})?.transactionData ?? []}
          />
        </div>
      </div>
    </div>
  );
};

const ProductTransaction = () => {
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
      content: () => <Transactions />,
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
          className="btn-back px-4 py-2 rounded"
          onClick={() => navigate.back()}
        >
          Back
        </Button>
        <div className="bg-white p-6 mt-4 shadow-md rounded-md">
          <div className="flex justify-between items-center h-16">
            <h1 className="font-semibold flex justify-center items-center text-xl">
              Product Name
            </h1>
            <DropDown
              // styles={{
              //   width: "300px",
              //   border: "1px solid #E6E6E6",
              // }}
              name={""}
              options={[]}
              // handleChange={undefined}
              placeholder={"Blend Name"}
            />
          </div>
          <Tabs
            tabs={tabList}
            active={1}
            onClick={(label: string) => {
              navigate.push(`/inventory/${productId}/${label}`);
            }}
          />
        </div>
      </div>
    </Suspense>
  );
};

export default ProductTransaction;
