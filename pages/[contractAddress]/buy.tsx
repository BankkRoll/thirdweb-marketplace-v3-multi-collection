// pages/[contractAddress]/buy.tsx
import React from "react";
import { useContract, useNFTs, useMetadata } from "@thirdweb-dev/react";
import Container from "../../components/Container/Container";
import NFTGrid from "../../components/NFT/NFTGrid";
import { useRouter } from "next/router";
import styles from "../../styles/Buy.module.css";

interface CollectionMetadata {
  name: string;
  description?: string;
  image?: string;
}

export default function Buy() {
  const router = useRouter();
  const { contractAddress } = router.query;

  const { contract } = useContract(contractAddress as string);
  const { data, isLoading } = useNFTs(contract);
  const { data: collectionMetadata } = useMetadata(contract) as {
    data: CollectionMetadata | undefined;
  };

  const collectionName = collectionMetadata?.name
    ? collectionMetadata.name
    : "Unknown Collection";

  return (
    <Container maxWidth="lg">
      {collectionMetadata && (
        <div className={styles.collectionMetadataContainer}>
          <img
            src={collectionMetadata.image}
            alt={collectionName}
            className={styles.collectionPicture}
          />
          <div className={styles.collectionText}>
            <h1>{collectionName}</h1>
            <p>{collectionMetadata.description}</p>
          </div>
        </div>
      )}

      <NFTGrid
        collectionAddress={contractAddress as string}
        data={data}
        isLoading={isLoading}
        emptyText={`Looks like there are no NFTs in the ${collectionName} collection.`}
        collectionName={collectionName}
      />
    </Container>
  );
}
