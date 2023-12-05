// components/Collection/CollectionCard.tsx
import React from "react";
import Link from "next/link";
import Skeleton from "../Skeleton/Skeleton";
import styles from "./CollectionCard.module.css";

type Props = {
  collectionName: string;
  description: string;
  imageUrl: string;
  contractAddress: string;
  isLoading: boolean;
};

export default function CollectionCard({
  collectionName,
  description,
  imageUrl,
  contractAddress,
  isLoading,
}: Props) {
  if (isLoading) {
    return (
      <div className={styles.collectionCard}>
        <div className={styles.collectionLink}>
          <div className={styles.collectionImage}>
            <Skeleton width="300px" height="300px" />
          </div>
          <div className={styles.collectionInfo}>
            <h3 className={styles.collectionName}>
              <Skeleton width="200px" height="20px" />
            </h3>
            <div className={styles.collectionDescription}>
              <Skeleton width="200px" height="14px" />
            </div>
          </div>
        </div>
      </div>
    );
  }

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
