
type Args = {
  node: any;
  onClick: (node_id: string) => void;
  is_loading: boolean;
}

function Document({node, onClick}: Args) {

  const onclick = () => {
    onClick(node.id);
  }

  return (
    <div className="node document">
      <div className="icon document"></div>
      <div className="title" onClick={onclick}>{node.title}</div>
    </div>
  );
}

export default Document;