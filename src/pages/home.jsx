import Head from "next/head";
import Layout from '../components/layout';

function Home() {
  return (
    <Layout>
      <Head>
        <title>Home</title>
      </Head>
      <h1>Home</h1>
      <button className="btn btn-primary m-3">Button Primary</button>
    </Layout>
  );
}

Home.requires_auth = true;

export default Home;
