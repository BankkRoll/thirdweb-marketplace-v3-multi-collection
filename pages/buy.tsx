// pages/buy.tsx
import React, { useState, useEffect } from "react";
import { useContract, useNFTs, useMetadata } from "@thirdweb-dev/react";
import Container from "../components/Container/Container";
import NFTGrid from "../components/NFT/NFTGrid";
import { NFT_COLLECTION_ADDRESSES } from "../const/contractAddresses";
import { useRouter } from "next/router";
import styles from "../styles/Buy.module.css";

interface CollectionMetadata {
  name: string;
  description?: string;
  image?: string;
}

const formatCollectionName = (name: string) => {
  return name.replace(/_/g, " ");
};

export default function Buy() {
  const router = useRouter();
  const [selectedCollection, setSelectedCollection] = useState(
    NFT_COLLECTION_ADDRESSES[0]
  );

  useEffect(() => {
    const collectionName =
      router.query.collectionName || NFT_COLLECTION_ADDRESSES[0].name;
    const collection = NFT_COLLECTION_ADDRESSES.find(
      (c) => c.name === collectionName
    );
    setSelectedCollection(collection || NFT_COLLECTION_ADDRESSES[0]);
  }, [router.query.collectionName]);

  const { contract } = useContract(selectedCollection.address);
  const { data, isLoading } = useNFTs(contract);
  const { data: collectionMetadata } = useMetadata(contract) as {
    data: CollectionMetadata | undefined;
  };

  return (
    <Container maxWidth="lg">
      {collectionMetadata && (
        <div className={styles.collectionMetadataContainer}>
          <img
            src={collectionMetadata.image}
            alt={collectionMetadata.name}
            className={styles.collectionPicture}
          />
          <div className={styles.collectionText}>
            <h1>
              {collectionMetadata.name ||
                formatCollectionName(selectedCollection.name)}
            </h1>
            <p>{collectionMetadata.description}</p>
          </div>
        </div>
      )}

      <NFTGrid
        data={data}
        isLoading={isLoading}
        emptyText={`Looks like there are no NFTs in the ${formatCollectionName(
          selectedCollection.name
        )} collection.`}
        collectionName={selectedCollection.name}
      />
    </Container>
  );
}
