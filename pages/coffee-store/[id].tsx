import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { ICoffeeStore } from "..";

import coffeeStoresData from "../../data/coffee-stores.json";
export const getStaticProps: GetStaticProps = async ({ params }) => {
  return {
    props: {
      coffeeStore: coffeeStoresData.find(
        (store) => store.id.toString() === params?.id
      ),
    },
  };
};

export const getStaticPaths = () => {
  const paths = coffeeStoresData.map((coffeeStore) => {
    return {
      params: {
        id: coffeeStore.id.toString(),
      },
    };
  });
  return {
    paths: paths,
    fallback: true,
  };
};

const CoffeeStore = ({ coffeeStore }: { coffeeStore: ICoffeeStore }) => {
  const { isFallback } = useRouter();
  if (isFallback) {
    return <div>Loading...</div>;
  }
  const { address, name, neighbourhood } = coffeeStore;
  return (
    <div>
      <Head>
        <title>{name}</title>
      </Head>
      <Link href={"/"}>
        <a>Back to home</a>
      </Link>
      <p>{address}</p>
      <p>{name}</p>
      <p>{neighbourhood}</p>
    </div>
  );
};

export default CoffeeStore;
