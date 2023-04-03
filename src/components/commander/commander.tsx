
import { getNode } from "@/utils";

import Folder from "./folder";
import Document from "./document";
import EmptyFolder from "./empty_folder";
import { is_empty } from "@/utils";

type Args = {
  node_id: string;
  onNodeClick: (node_id: string) => void;
}

function Commander({node_id, onNodeClick}: Args) {

  let node = getNode(node_id);

  if (node && node.node) {
    let items: Array<any> = node.node.items;
    let nodes;

    if (is_empty(items)) {
      return <EmptyFolder />;
    }

    nodes = items.map((item: any) => {
      if (item.ctype == 'folder') {
        return <Folder onClick={onNodeClick} node={item} />;
      } else {
        return <Document onClick={onNodeClick} node={item} />;
      }
    });

    return <div>{nodes}</div>;
  }

  return <>Skeleton</>;
}

export default Commander;