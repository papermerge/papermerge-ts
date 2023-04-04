
import Cookies from 'js-cookie';

import Folder from "./folder";
import Document from "./document";
import EmptyFolder from "./empty_folder";
import Breadcrumb from '../breadcrumb/breadcrumb';

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


export const fetcher = (url:string) => {
  const token = Cookies.get('token');
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
  let full_url = `http://localhost:8000${url}`;

  return fetch(full_url, {headers: headers}).then(res => res.json());
}


function useNodeListPlus(node_id: string): NodeListPlusT  {
  let [data, setData] = useState<NodeListPlusT>([]);
  let prom: any;

  if (!node_id) {
    setData([]);
    return [];
  }

  useEffect(() => {
    console.log('useEffect');

    try {
      prom = Promise.all([
        fetcher(`/nodes/${node_id}`),
        fetcher(`/folders/${node_id}`)
      ]);
    } catch (error) {
      setData([]);
    }

    if (node_id) {
      let ignore = false;
      prom.then((json: NodeListPlusT) => {
        if (!ignore) {
          setData(json);
        }
      }).catch((error: string) => setData([]));
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

  let [nodes_list, breadcrumb]: NodeListPlusT = useNodeListPlus(node_id);
  let nodes;

  if (nodes_list) {
    let items = nodes_list.items;

    if (is_empty(items)) {
      nodes = <EmptyFolder />;
    } else {
      nodes = items.map((item: any) => {
        if (item.ctype == 'folder') {
          return <Folder onClick={onNodeClick} node={item} />;
        } else {
          return <Document onClick={onNodeClick} node={item} />;
        }
      });
    }

    return (
      <>
        {breadcrumb && <Breadcrumb path={breadcrumb.breadcrumb} onClick={onNodeClick} />}
        {nodes}
      </>
    )
  }

  return <>Skeleton</>;
}

export default Commander;