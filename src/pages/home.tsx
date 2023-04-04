import { useEffect, useState } from 'react';
import Head from "next/head";
import Layout from '../components/layout';
import Commander from '../components/commander/commander';

import { useUser } from "@/contexts/user";


function Home() {
  const user_context = useUser();
  const [ node_id, set_node_id ] = useState('');

  useEffect( () => {
    if (!node_id) {
      set_node_id(user_context.user?.home_folder_id || '');
    }
  }, [user_context.user]);

  const onNodeClick = (node_id: string) => {
    set_node_id(node_id);
  }

  if (!node_id ) {
    return <div>Loading...{user_context.user?.username} {user_context.user?.home_folder_id}</div>;
  }

  return (
    <Layout>
      <Head>
        <title>Home</title>
      </Head>
      <Commander node_id={node_id} onNodeClick={onNodeClick} />
    </Layout>
  );
}

export default Home;
