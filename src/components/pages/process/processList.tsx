import { DateTime } from "luxon";
import { useFetch } from "@/customeHooks";
import { useRouter } from "next/navigation";
import { getTrackingList, upsertTracking } from "@/shared/api";
import { useEffect, useMemo, useState } from "react";
import { FiDelete, FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";
import { Loader2 } from "lucide-react";

import { Button, Spinner } from "@/components/ui";
import { ComponentTitleBar } from "@/components/custom";
import { DataTable } from "@/components/ui/dataTable";
import Link from "next/link";
const ProcessList = () => {
  const apiData = useMemo(() => {
    return { processList: getTrackingList };
  }, []);
  const [loading, data] = useFetch(apiData, {});
  const [trackingList, settrackingList] = useState([]);
  const navigate = useRouter();

  useEffect(() => {
    settrackingList(data.processList);
  }, [data]);

  const handleClick = (path: string, state: Record<string, string>) => {
    navigate.push(path);
  };
  const handleDelete = async (data: any) => {
    try {
      const { id, title } = data;
      if (confirm(`Do you want to delete ${title}?`)) {
        await upsertTracking({ id, title, isDeleted: true });
        const newTrackingList = trackingList.filter(
          (e: any) => e.trackingId !== id
        );
        settrackingList(newTrackingList);
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="h-full w-full">
      <div className="tracking-management">
        <div className="header">
          <ComponentTitleBar
            title="Process Management"
            suffix={
              <Button onClick={() => navigate.push("/process/create")}>
                <FiPlus size={20} /> &nbsp; Create Process
              </Button>
            }
          />
        </div>
        <div className="table-container bg-white p-4 my-4 rounded">
          {false ? (
            <Spinner />
          ) : (
            <DataTable
            loading={loading}
              columns={[
                {
                  accessorKey: "title",
                  header: `Title`,
                  cell: (row: any) => (
                    <label className="font-[400] text-[14px] text-[var(--primary)]">
                      {row.getValue() as any}
                    </label>
                  ),
                },
                {
                  accessorKey: "createdAt",
                  header: "Created Date & Time",
                  maxSize: 5,
                  cell: (rows: any) => (
                    <div className="">{rows.getValue() as any}</div>
                  ),
                },
                {
                  accessorKey: "id",
                  cell: () => <>6</>,
                  header: "Connected Nodes",
                },
                {
                  accessorKey: "id",
                  header: "Manage Pipeline",
                  cell: (row: any) => (
                    <Link
                      className="font-[400] text-[14px] text-[var(--primary)]"
                      href={`/process/${row.renderValue()}/manage`}
                    >
                      Manage
                    </Link>
                  ),
                },
                {
                  accessorKey: "id",
                  header: "Action",
                  cell: (cell: any) => (
                    <div className="flex gap-3">
                      <FiEdit
                        color="var(--primary)"
                        size={18}
                        onClick={() =>
                          navigate.push(`/process/${cell.getValue()}/edit`)
                        }
                      />{" "}
                      <FiDelete color="var(--primary)" size={18} />
                    </div>
                  ),
                },
              ]}
              data={trackingList ?? []}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProcessList;
