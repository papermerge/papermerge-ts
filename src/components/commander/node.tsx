import Document from "./document";
import Folder from "./folder";

type Args = {
  node: any;
  onNodeClick: (node_id: string) => void;
}

function Node({node, onNodeClick}: Args) {

  if (node.ctype == 'folder') {
    return <Folder node={node} onClick={onNodeClick} />
  }

  return <Document node={node} onClick={onNodeClick} />

}

export default Node;