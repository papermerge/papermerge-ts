import Spinner from "../spinner";
import SpinnerPlaceholder from "../spinner_placeholder";

type Args = {
  node: any;
  onClick: (node_id: string) => void;
  is_loading: boolean;
}


function Folder({node, onClick, is_loading}: Args) {

  const onclick = () => {
    onClick(node.id);
  }

  return (
    <>
      <div className="node folder">
        {is_loading ? <Spinner />: <SpinnerPlaceholder />}
        <div className="icon folder"></div>
        <div className="title" onClick={onclick}>{node.title}</div>
      </div>
    </>
  );
}

export default Folder;