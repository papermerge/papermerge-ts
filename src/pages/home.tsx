import Head from "next/head";
import Layout from '../components/layout';

import { useUser } from "@/contexts/user";


function Home() {
  const user_context = useUser();
  
  return (
    <Layout>
      <Head>
        <title>Home</title>
      </Head>
      <h1>Home</h1>
      {user_context?.user?.home_folder_id}
      <button className="btn btn-primary m-3">Button Primary</button>
    </Layout>
  );
}

Home.requires_auth = true;

export default Home;
