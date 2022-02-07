import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./card.module.css";
//rafce

interface ICard {
  name: string;
  href: string;
  imgUrl: string;
}
const Card = ({ href, name, imgUrl }: ICard) => {
  return (
    <Link href={href}>
      <a className={`${styles.cardLink} `}>
        <div className={`${styles.container} glass`}>
          <div className={styles.cardHeaderWrapper}>
            <h2 className={styles.cardHeader}>{name}</h2>
          </div>
          <div className={styles.cardHeaderWrapper}>
            <Image
              src={
                imgUrl ||
                "https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80"
              }
              className={styles.cardImage}
              width={260}
              height={160}
              alt={name}
            />
          </div>
        </div>
      </a>
    </Link>
  );
};

export default Card;
