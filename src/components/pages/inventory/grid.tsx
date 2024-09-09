'use client'
import { useRouter, useParams, usePathname } from "next/navigation";
import { Button, DataTable, Spinner } from "@/components/ui";
import { ComponentTitleBar } from "@/components/custom";
import { useFetch } from "@/customeHooks";
import { getProductList } from "@/shared/api";
import { FiPlus } from "react-icons/fi";

const ProductList = () => {
  const path = usePathname();
  const api = {
    inventoryList: getProductList,
  };
  const [loading, data] = useFetch(api, { inventoryList: [{ isAdmin: true }] });
  const navigate = useRouter();

  return (
    <div className="h-full">
      <div className="tracking-management">
        <div className="header h-[40px]">
          <ComponentTitleBar
            title={`Inventory Management`}
            suffix={
              <Button
                onClick={() => {
                  navigate.push(`${path}/create`);
                }}
                style={{
                  padding: "0.5rem 1rem",
                }}
              >
                <FiPlus size={20} /> &nbsp; Create Product
              </Button>
            }
          />
        </div>
        <div className="table-container bg-white p-4 my-4 rounded">
          <DataTable
            loading={loading}
            columns={[
              {
                accessorKey: "name",
                header: "Product Name",
                cell: ({ row }) => (
                  <div
                    className="cursor-pointer text-primary"
                    onClick={() =>
                      navigate.push(`/inventory/${row.original.id}`)
                    }
                  >
                    {row.original.name}
                  </div>
                ),
              },
              {
                accessorKey: "sku",
                header: "Header",
              },
              {
                accessorKey: "category",
                header: "Category",
              },
              {
                header: "Convertion Rate",
                cell: ({ row: { original } }) => {
                  return original.secondaryUnit
                    ? `1 ${original.baseUnit} = ${
                        original.convertionRate || 0
                      } ${original.secondaryUnit}`
                    : original.baseUnit;
                },
              },
              {
                accessorKey: "quantity",
                header: "Stock In Hand",
              },
            ]}
            data={(data.inventoryList as Record<string, string>[]) ?? []}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductList;
