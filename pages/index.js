import Head from "next/head";
import Image from "next/image";
import Layout from "../components/Layout/Layout";
import Sections from "../components/Sections/Sections";
import { fetchAPI } from "../lib/api";

import styles from "./index.module.scss";

export async function getStaticProps() {
  const [homeData, globalData] = await Promise.all([
    fetchAPI("/home?populate=deep"),
    fetchAPI("/global?populate=deep"),
  ]);
  return {
    props: { homeData, globalData },
    revalidate: 1,
  };
}

export default function Home({ homeData, globalData }) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout
        homeHeaderImage={
          homeData.data.attributes.headerImage.data.attributes.url
        }
        globalData={globalData}
      >
        <main className={styles.main}>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa, ad
            dicta! Nisi, aspernatur hic ipsum magnam ullam quaerat facilis sequi
            quod, illum quia nostrum ipsam quos numquam vero magni quisquam.
          </p>
        </main>
        <Sections sections={homeData.data.attributes.contentSections} />
      </Layout>
    </>
  );
}
