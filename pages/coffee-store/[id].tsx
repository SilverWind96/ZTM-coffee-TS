import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { ICoffeeStore } from "..";
import styles from "../../styles/coffee-store.module.css";
import Image from "next/image";
import {
  // fetchCoffeeStorePhotos,
  fetchCoffeeStores,
} from "../../lib/coffee-stores";
import { useContext, useEffect, useState } from "react";
// import { StoreContext } from "../_app";
import { isEmpty } from "../../utils";
import { StoreContext } from "../../store/store-context";

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const coffeeStores = await fetchCoffeeStores();
  // let coffeeStorePhotos;
  // if (params && typeof params.id === "string") {
  //   coffeeStorePhotos = await fetchCoffeeStorePhotos(params.id);
  // }

  return {
    props: {
      coffeeStore:
        coffeeStores.find(
          (store: ICoffeeStore) => store.fsq_id.toString() === params?.id
        ) || {},
    },
  };
};

export const getStaticPaths = async () => {
  const coffeeStores = await fetchCoffeeStores();
  const paths = coffeeStores.map((coffeeStore: ICoffeeStore) => {
    return {
      params: {
        id: coffeeStore.fsq_id.toString(),
      },
    };
  });
  return {
    paths: paths,
    fallback: true,
  };
};

const CoffeeStore = ({ coffeeStore }: { coffeeStore: ICoffeeStore }) => {
  const {
    isFallback,
    query: { id },
  } = useRouter();

  const [_coffeeStore, _setCoffeeStore] = useState(coffeeStore);

  const {
    state: { coffeeStores },
  } = useContext(StoreContext);

  // useEffect(() => {
  //   if (isEmpty(coffeeStore)) {
  //     if (coffeeStores.length > 0) {
  //       const coffeeStoreFromContext = coffeeStores.find((coffeeStore) => {
  //         return coffeeStore.fsq_id.toString() === id; //dynamic id
  //       });

  //       if (coffeeStoreFromContext) {
  //         _setCoffeeStore(coffeeStoreFromContext);
  //         // handleCreateCoffeeStore(coffeeStoreFromContext);
  //       }
  //     }
  //   }
  // }, [coffeeStore, id, coffeeStores]);

  if (isFallback) {
    return <div>Loading...</div>;
  }
  const {
    location: { address, region },
    name,
    imgUrl,
  } = coffeeStore;

  const handleUpvoteBtn = () => {
    console.log("clicked");
  };

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href={"/"}>
              <a>← Back to home</a>
            </Link>{" "}
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image
            src={
              imgUrl ||
              "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
            }
            alt={name}
            width={600}
            height={360}
            className={styles.storeImg}
          />
        </div>
        <div className={`${styles.col2} glass`}>
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/places.svg"
              alt="Coffee Icon"
              width="24"
              height="24"
            />
            <p className={styles.text}>{address}</p>
          </div>
          {!!region && (
            <div className={styles.iconWrapper}>
              <Image
                src="/static/icons/nearMe.svg"
                alt="Coffee Icon"
                width="24"
                height="24"
              />
              <p className={styles.text}>{region}</p>
            </div>
          )}{" "}
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/star.svg"
              alt="Coffee Icon"
              width="24"
              height="24"
            />
            <p className={styles.text}>1</p>
          </div>
          <button className={styles.upvoteButton} onClick={handleUpvoteBtn}>
            Up vote!
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeStore;
