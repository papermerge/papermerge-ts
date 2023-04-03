import Head from "next/head";
import Layout from '../components/layout';

import { getCurrentUser } from "@/utils";


export default function Inbox() {
  const user_context = getCurrentUser();

  return (
    <Layout>
      <Head>
        <title>Inbox</title>
      </Head>
      {user_context?.user.inbox_folder_id}
    </Layout>
  );
}