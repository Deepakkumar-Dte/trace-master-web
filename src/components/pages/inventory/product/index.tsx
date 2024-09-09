import { Button, Tabs } from "@/components/ui";
import { memo, Suspense } from "react";
import { Spinner } from "@/components/ui";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useFetch } from "@/customeHooks";
import { getProductDetails } from "@/shared/api";
import { Component as Overview } from "./overview";
import { Transactions } from "./transactions";
import { History } from "./history";
import DropDown from "@/components/ui/dropdown";

type pathNames = "overview" | "transaction" | "history";

const ProductOverLay = () => {
  const path = usePathname();
  const navigate = useRouter();
  const { productId } = useParams();
  const tabList = [
    {
      label: "Overview",
      content: () => <Overview />,
      navigateTo: "overview",
    },
    {
      label: "Transaction",
      content: () => <Transactions />,
      navigateTo: "transaction",
    },
    {
      label: "history",
      content: () => <History />,
      navigateTo: "history",
    },
  ];

  const pathName = (path.split("/").pop() as pathNames) ?? "overview";
  const active =
    pathName === "overview" ? 0 : pathName === "transaction" ? 1 : 2;

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
          <FilterAndNavigation type={pathName} />
          <Tabs
            tabs={tabList}
            active={active}
            onClick={(label) => {
              navigate.push(`/inventory/${productId}/${label}`);
            }}
          />
        </div>
      </div>
    </Suspense>
  );
};

const FilterAndNavigation = memo(({ type }: { type: pathNames }) => {
  const navigate = useRouter();
  const { productId } = useParams();
  return type === "overview" ? (
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
  ) : (
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
  );
});

export default ProductOverLay;
