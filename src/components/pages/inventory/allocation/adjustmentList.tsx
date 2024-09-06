import { useFetch } from "@/customeHooks";
import { getInventoryTracking } from "@/shared/api";
import { useEffect, useMemo, useState } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Button, DataTable, Spinner } from "@/components/ui";
import { BiEdit } from "react-icons/bi";

const ProductStorageList = () => {
  const { productId } = useParams();
  const path = usePathname();
  const apiData = useMemo(() => {
    return { trackingList: getInventoryTracking };
  }, []);
  const [loading, data] = useFetch(apiData, {
    trackingList: [{ productId, latest: true }],
  });
  const [trackingList, settrackingList] = useState([]);
  const navigate = useRouter();

  useEffect(() => {
    settrackingList(data.trackingList?.data || []);
  }, [data]);

  if (loading) return <Spinner />;

  return (
    <div className="h-full">
      <div className="tracking-management mx-[4.5rem]">
        <div className="header">
          <Button
            onClick={() => {
              navigate.back();
            }}
            style={{
              padding: "0.5rem 1rem",
            }}
          >
            Back
          </Button>
          <div className="flex gap-2">
            <Button
              onClick={() => {
                navigate.push(`${path}/create`);
              }}
              style={{
                padding: "0.5rem 1rem",
              }}
            >
              New Adjustment
            </Button>
            <Button
              style={{
                padding: "0.5rem 1rem",
              }}
              onClick={() => {}}
            >
              Import
            </Button>
            <Button
              style={{
                padding: "0.5rem 1rem",
              }}
              onClick={() => {}}
            >
              Export
            </Button>
          </div>
        </div>
        <div className="table-container bg-white p-4">
          {/* <div className="flex justify-between mr-4 my-3">
            <h2 className="px-3 font-bold text-xl">Adjustment Stock</h2>
            <SearchBar
              onSearch={undefined}
              value={undefined}
              filter={undefined}
              applyFilter={undefined}
            />
          </div> */}
          <DataTable
            data={trackingList}
            columns={[
              { accessorKey: "nodeTitle", header: "Node Name" },
              { accessorKey: "processTile", header: "Process Name" },
              { accessorKey: "modifiedBy", header: "InCharge Name" },
              { accessorKey: "quantity", header: "Stock In Hand" },
              {
                accessorKey: "id",
                header: "Action",
                cell: () => {
                  return <BiEdit />;
                },
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductStorageList;
