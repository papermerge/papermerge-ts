
import Cookies from 'js-cookie';

import Folder from "./folder";
import Document from "./document";
import EmptyFolder from "./empty_folder";
import Breadcrumb from '../breadcrumb/breadcrumb';
import Button from 'react-bootstrap/Button';
import NewFolderModal from "../modals/new_folder";

import { is_empty } from "@/utils";
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


export const fetcher = (url:string) => {
  const token = Cookies.get('token');
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
  let full_url = `http://localhost:8000${url}`;

  return fetch(full_url, {headers: headers}).then(res => res.json());
}


function useNodeListPlus(node_id: string): State<NodeListPlusT>  {
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
        fetcher(`/nodes/${node_id}`),
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
  }, [node_id]);

  return data;
}

type Args = {
  node_id: string;
  onNodeClick: (node_id: string) => void;
}

function Commander({node_id, onNodeClick}: Args) {
  const [ newFolderModalShow, setNewFolderModalShow ] = useState(false);
  let {
    is_loading,
    error,
    loading_id,
    data: [nodes_list, breadcrumb]
  }: State<NodeListPlusT> = useNodeListPlus(node_id);
  let nodes;

  if (nodes_list) {
    let items = nodes_list.items;

    if (is_empty(items)) {
      nodes = <EmptyFolder />;
    } else {
      nodes = items.map((item: any) => {
        if (item.ctype == 'folder') {
          return <Folder onClick={onNodeClick} node={item} is_loading={loading_id == item.id} />;
        } else {
          return <Document onClick={onNodeClick} node={item} is_loading={loading_id == item.id} />;
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