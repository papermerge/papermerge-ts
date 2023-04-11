import Button from 'react-bootstrap/Button';

type Args = {
  onNewFolderClick: () => void;
  onDeleteNodesClick: () => void;
  selected_nodes: Array<string>;
}

function Menu({onNewFolderClick, onDeleteNodesClick, selected_nodes}: Args) {

  const new_folder = <Button variant='light' onClick={() => onNewFolderClick()}>
      <i className="bi bi-folder-plus"></i>
    </Button>;
  const delete_nodes = <Button variant='danger' onClick={() => onDeleteNodesClick()}>
    <i className="bi bi-trash"></i>
  </Button>;
  const rename_node = <Button variant='light'>
    <i className="bi bi-pencil"></i>
  </Button>;

  if (selected_nodes.length > 1) {
    return <div>
      {new_folder}
      {delete_nodes}
    </div>
  }

  if (selected_nodes.length == 1) {
    return <div>
      {new_folder}
      {rename_node}
      {delete_nodes}
    </div>
  }

  return <div>
    {new_folder}
  </div>
}

export default Menu;