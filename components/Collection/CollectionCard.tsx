// components/Collection/CollectionCard.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./CollectionCard.module.css";

type Props = {
  collectionName: string;
  description: string;
  imageUrl: string;
};

export default function CollectionCard({
  collectionName,
  description,
  imageUrl,
}: Props) {
  const formatCollectionName = (name: string) => {
    return name.replace(/_/g, " ");
  };

  return (
    <div className={styles.collectionCard}>
      <Link href={`/buy?collectionName=${encodeURIComponent(collectionName)}`}>
        <div className={styles.collectionLink}>
          <div className={styles.collectionImage}>
            <Image
              width={300}
              height={300}
              src={imageUrl}
              objectFit="cover"
              alt={`Image of ${collectionName}`}
            />
          </div>
          <div className={styles.collectionInfo}>
            <h3 className={styles.collectionName}>
              {formatCollectionName(collectionName)}
            </h3>
            <p className={styles.collectionDescription}>{description}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
