
type Args = {
  node: any;
  onClick: (node_id: string) => void;
}

function Folder({node, onClick}: Args) {

  const onclick = () => {
    onClick(node.id);
  }

  return (
    <a onClick={onclick}>F {node.title}</a>
  );

}

export default Folder;