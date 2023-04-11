import { useState, useEffect } from 'react';

import Folder from "./folder";
import Document from "./document";
import EmptyFolder from "./empty_folder";
import Breadcrumb from '../breadcrumb/breadcrumb';
import NewFolderModal from "../modals/new_folder";
import Paginator from "../paginator";
import Menu from "./menu";

import { is_empty } from "@/utils";
import { fetcher } from "@/utils/fetcher";

import type { FolderType, NodeType } from '@/types';
import DeleteNodesModal from '../modals/delete_nodes';


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

type UUIDList = Array<string>;
type NodeList = Array<NodeType>;


function Commander({node_id, page_number, onNodeClick, onPageClick}: Args) {
  const [ newFolderModalShow, setNewFolderModalShow ] = useState(false);
  const [ deleteNodesModalShow, setDeleteNodesModalShow ] = useState(false);
  const [ selectedNodes, setSelectedNodes ] = useState<UUIDList>([]);
  const [ nodesList, setNodesList ] = useState<NodeList>([]);
  let {
    is_loading,
    error,
    loading_id,
    data: [nodes_list, breadcrumb]
  }: State<NodeListPlusT> = useNodeListPlus(node_id, page_number);
  let nodes;

  const onNodeSelect = (node_id: string, selected: boolean) => {
    if (selected) {
      setSelectedNodes(
        [...selectedNodes, node_id]
      );
    } else {
      setSelectedNodes(
        selectedNodes.filter(uuid => uuid !== node_id)
      );
    }
  }

  const onCreateNewFolder = (new_node: NodeType) => {
    setNodesList([
      new_node,
      ...nodesList
    ]);
    setNewFolderModalShow(false);
  }

  const onDeleteNodes = (node_ids: string[]) => {
    let new_nodes = nodesList.filter(
      node => node_ids.indexOf(node.id) == -1
    );
    setNodesList(new_nodes);
    setDeleteNodesModalShow(false);
    setSelectedNodes([]);
  }

  useEffect(() => {
    if (nodes_list) {
      setNodesList(nodes_list.items);
    }
  }, [nodes_list]);

  if (nodes_list) {
    let items = nodesList;

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
          <Menu
            onNewFolderClick={() => setNewFolderModalShow(true)}
            onDeleteNodesClick={ () => setDeleteNodesModalShow(true) }
            selected_nodes={selectedNodes} />
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

        <Paginator
          num_pages={nodes_list.num_pages}
          active={nodes_list.page_number}
          onPageClick={onPageClick} />

        <div>
          <NewFolderModal
            show={newFolderModalShow}
            parent_id={node_id}
            onCancel={() => setNewFolderModalShow(false)}
            onSubmit={onCreateNewFolder} />
        </div>
        <div>
          <DeleteNodesModal
            show={deleteNodesModalShow}
            node_ids={selectedNodes}
            onCancel={() => setDeleteNodesModalShow(false)}
            onSubmit={onDeleteNodes} />
        </div>
      </>
    )
  }

  return <>Skeleton</>;
}

export default Commander;