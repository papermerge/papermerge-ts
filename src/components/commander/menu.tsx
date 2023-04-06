import Button from 'react-bootstrap/Button';

type Args = {
  onNewFolderClick: () => void;
}

function Menu({onNewFolderClick}: Args) {
  return <div>
    <Button variant='light'
      onClick={() => onNewFolderClick()}>
      <i className="bi bi-pencil"></i>
    </Button>
  </div>
}

export default Menu;