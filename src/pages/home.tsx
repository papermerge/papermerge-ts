import { useState } from 'react';
import Head from "next/head";
import Layout from '../components/layout';
import Commander from '../components/commander/commander';

import { useUser } from "@/contexts/user";


function Home() {
  const user_context = useUser();
  const [ node_id, set_node_id ] = useState(user_context.user?.home_folder_id);

  const onNodeClick = (node_id: string) => {
    set_node_id(node_id);
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

Home.requires_auth = true;

export default Home;
