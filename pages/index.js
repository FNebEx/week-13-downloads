import Heading from "components/Heading";
import Head from "next/head";

export default function index() {
  return (
    <div>
      <Head>
        <title>Digital Downloads</title>
        <meta name="description" content="Digital Downloads Website"/>
      </Head>

      <Heading />
      <h1 className='flex justify-center mt-20 text-xl'>Digital Downloads</h1>
    </div>
  );
};
