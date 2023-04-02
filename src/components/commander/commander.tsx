
import { getNode } from "@/utils";
import Node from "./node";

type Args = {
  node_id: string;
  onNodeClick: (node_id: string) => void;
}

function Commander({node_id, onNodeClick}: Args) {

  let node = getNode(node_id);

  if (node && node.node) {
    let nodes = node.node.items;

    return (
      <>
        {
          nodes.map(
            (item: any) => (
              <Node onNodeClick={onNodeClick} node={item} />
            )
          )
        }
      </>
    )
  }

  return <>Skeleton</>;
}

export default Commander;