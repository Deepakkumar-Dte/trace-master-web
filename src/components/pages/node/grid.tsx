'use client'
import { ComponentTitleBar } from "@/components/custom";
import { Button, Spinner } from "@/components/ui";
import { useFetch } from "@/customeHooks";
import { getNodeList, removeNode } from "@/shared/api";
import { useParams, usePathname, useRouter } from "next/navigation";
import { FiPlus } from "react-icons/fi";

const Grid = () => {
  const { processId } = useParams();
  const path = usePathname();
  const navigate = useRouter();
  const fetchPayload = {
    nodeList: processId ? [{ processId }] : [],
  };
  const [loading, data, _err, _setData, fetch] = useFetch(
    { nodeList: getNodeList },
    fetchPayload
  );

  const handleCreateNode = () => {
    navigate.push(`${path}/create`);
  };

  const handleEditNode = (id: string) => {
    navigate.push(`${path}/edit/${id}`);
  };

  const handleDelete = async (id: string) => {
    try {
      await removeNode(id);
      fetch();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="node-management h-full">
      <div className="header">
        <ComponentTitleBar
          title="Node Management"
          suffix={
            <Button onClick={handleCreateNode}>
              <FiPlus /> &nbsp; Create Node
            </Button>
          }
        />
      </div>
      {loading && !Object.keys(data).length ? (
        <Spinner />
      ) : (
        <div className="node-list grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
          {data.nodeList.length ? (
            (data.nodeList ?? []).map((node: any) => (
              <div key={node.id} className="node-card">
                <div className="node-card-header">
                  <h3>{node.name}</h3>
                  <div className="node-card-actions">
                    <button onClick={() => handleEditNode(node.id)}>
                      Edit
                    </button>
                    <button onClick={() => handleDelete(node.id)}>
                      Delete
                    </button>
                  </div>
                </div>
                <h4 className="pb-2">Process - {node.process.title}</h4>
                <p>{node?.description || "Basic Node Description"}</p>
              </div>
            ))
          ) : (
            <div className="w-full  flex col-span-3 h-full justify-center items-center">
              No Nodes Available
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Grid;
