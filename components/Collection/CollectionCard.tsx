// components/Collection/CollectionCard.tsx
import React from "react";
import Link from "next/link";
import styles from "./CollectionCard.module.css";

type Props = {
  collectionName: string;
  description: string;
  imageUrl: string;
  contractAddress: string;
};

export default function CollectionCard({
  collectionName,
  description,
  imageUrl,
  contractAddress,
}: Props) {
  return (
    <div className={styles.collectionCard}>
      <Link href={`/${contractAddress}/buy`}>
        <div className={styles.collectionLink}>
          <div className={styles.collectionImage}>
            <img
              width={300}
              height={300}
              src={imageUrl}
              alt={`Image of ${collectionName}`}
            />
          </div>
          <div className={styles.collectionInfo}>
            <h3 className={styles.collectionName}>{collectionName}</h3>
            <p className={styles.collectionDescription}>{description}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
