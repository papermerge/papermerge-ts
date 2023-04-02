
type Args = {
  node: any;
  onClick: (node_id: string) => void;
}

function Document({node, onClick}: Args) {

  const onclick = () => {
    onClick(node.id);
  }

  return (
    <a onClick={onclick}>D {node.title}</a>
  );

}

export default Document;