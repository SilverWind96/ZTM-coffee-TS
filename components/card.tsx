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
              src={imgUrl}
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
