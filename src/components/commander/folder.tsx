
type Args = {
  node: any;
  onClick: (node_id: string) => void;
}


function Folder({node, onClick}: Args) {

  const onclick = () => {
    onClick(node.id);
  }

  return (
    <div className="node folder">
      <div className="icon folder"></div>
      <div className="title" onClick={onclick}>{node.title}</div>
    </div>
  );

}

export default Folder;