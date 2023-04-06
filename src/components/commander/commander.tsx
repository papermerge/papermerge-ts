import Folder from "./folder";
import Document from "./document";
import EmptyFolder from "./empty_folder";
import Breadcrumb from '../breadcrumb/breadcrumb';
import Button from 'react-bootstrap/Button';
import NewFolderModal from "../modals/new_folder";
import Paginator from "../paginator";

import { is_empty } from "@/utils";
import { fetcher } from "@/utils/fetcher";
import { useState, useEffect } from 'react';


type CType = "folder" | "document";

type BreadcrumbItemType = [string, string];

type BreadcrumbType = Array<BreadcrumbItemType>;


type NodeType = {
  id: string
  ctype: CType;
  parent_id: string | null;
  title: string;
  user_id: string;
  update_at: string;
}

type FolderType = NodeType & {
  breadcrumb: BreadcrumbType;
}

type NodeResultType = {
  items: NodeType[];
  num_pages: number;
  page_number: number;
  per_page: number;
}

type NodeListPlusT = [NodeResultType, FolderType] | [];

type State<T> = {
  is_loading: boolean;
  loading_id: string | null;
  error: unknown;
  data: T;
}

function useNodeListPlus(node_id: string, page_number: number): State<NodeListPlusT>  {
  const initial_state: State<NodeListPlusT> = {
    is_loading: true,
    loading_id: node_id,
    error: null,
    data: []
  };
  let [data, setData] = useState<State<NodeListPlusT>>(initial_state);
  let prom: any;

  if (!node_id) {
    setData(initial_state);
    return initial_state;
  }

  useEffect(() => {

    const loading_state: State<NodeListPlusT> = {
      is_loading: true,
      loading_id: node_id,
      error: null,
      data: data.data
    };
    setData(loading_state);

    try {
      prom = Promise.all([
        fetcher(`/nodes/${node_id}?page_number=${page_number}`),
        fetcher(`/folders/${node_id}`)
      ]);
    } catch (error) {
      let error_state: State<NodeListPlusT> = {
        is_loading: false,
        loading_id: null,
        error: error,
        data: data.data
      };
      setData(error_state);
    }

    if (node_id) {
      let ignore = false;

      prom
      .then(
        (json: NodeListPlusT) => {
          if (!ignore) {
            let ready_state: State<NodeListPlusT> = {
              is_loading: false,
              loading_id: null,
              error: null,
              data: json
            };
            setData(ready_state);
          }
        })
      .catch(
        (error: unknown) => {
          let error_state: State<NodeListPlusT> = {
            is_loading: false,
            loading_id: null,
            error: error,
            data: data.data
          };
          setData(error_state);
        }
      );

      return () => {
        ignore = true;
      };
    }
  }, [node_id, page_number]);

  return data;
}

type Args = {
  node_id: string;
  page_number: number;
  onNodeClick: (node_id: string) => void;
  onPageClick: (page_number: number) => void;
}


function Commander({node_id, page_number, onNodeClick, onPageClick}: Args) {
  const [ newFolderModalShow, setNewFolderModalShow ] = useState(false);
  const [ selectedNodes, setSelectedNodes ] = useState([]);
  let {
    is_loading,
    error,
    loading_id,
    data: [nodes_list, breadcrumb]
  }: State<NodeListPlusT> = useNodeListPlus(node_id, page_number);
  let nodes;

  const onNodeSelect = (node_id: string, selected: boolean) => {
    console.log(`Node ${node_id} selection changed; selected=${selected}`);
  }

  if (nodes_list) {
    let items = nodes_list.items;
    let paginator = <Paginator
      num_pages={nodes_list.num_pages}
      active={nodes_list.page_number}
      onPageClick={onPageClick}
    />

    if (is_empty(items)) {
      nodes = <EmptyFolder />;
    } else {
      nodes = items.map((item: any) => {
        if (item.ctype == 'folder') {
          return <Folder
            onClick={onNodeClick}
            onSelect={onNodeSelect}
            node={item}
            is_loading={loading_id == item.id}
          />;
        } else {
          return <Document
            onClick={onNodeClick}
            onSelect={onNodeSelect}
            node={item}
            is_loading={loading_id == item.id}
          />;
        }
      });
    }

    return (
      <>
        <div>
          <Button variant='light'
            onClick={() => setNewFolderModalShow(true)}>
            <i className="bi bi-pencil"></i>
          </Button>
        </div>
        {
          breadcrumb
            &&
          <Breadcrumb
            path={breadcrumb.breadcrumb}
            onClick={onNodeClick}
            is_loading={is_loading} />
        }
        {nodes}
        {paginator}

        <div>
          <NewFolderModal
            show={newFolderModalShow}
            parent_id={node_id}
            onHide={() => setNewFolderModalShow(false)} />
        </div>
      </>
    )
  }

  return <>Skeleton</>;
}

export default Commander;