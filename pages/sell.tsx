import React, { useState, useEffect } from "react";
import {
  ThirdwebNftMedia,
  useAddress,
  useContract,
  useOwnedNFTs,
  useMetadata,
} from "@thirdweb-dev/react";
import Container from "../components/Container/Container";
import NFTGrid from "../components/NFT/NFTGrid";
import { NFT_COLLECTION_ADDRESSES } from "../const/contractAddresses";
import tokenPageStyles from "../styles/Token.module.css";
import styles from "../styles/Buy.module.css";
import { NFT as NFTType } from "@thirdweb-dev/sdk";
import SaleInfo from "../components/SaleInfo/SaleInfo";
import { useRouter } from "next/router";

interface CollectionMetadata {
  name: string;
  description?: string;
  image?: string;
}

export default function Sell() {
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
  const address = useAddress();
  const { data, isLoading } = useOwnedNFTs(contract, address);
  const { data: collectionMetadata } = useMetadata(contract) as {
    data: CollectionMetadata | undefined;
  };
  const [selectedNft, setSelectedNft] = useState<NFTType | null>(null);

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
            <h1>{collectionMetadata.name || selectedCollection.name}</h1>
            <p>{collectionMetadata.description}</p>
          </div>
        </div>
      )}

      <h1>Sell NFTs</h1>
      {!selectedNft ? (
        <>
          <p>Select which NFT you&rsquo;d like to sell below.</p>
          <NFTGrid
            data={data}
            isLoading={isLoading}
            overrideOnclickBehavior={setSelectedNft}
            emptyText="Looks like you don't own any NFTs in this collection."
            collectionName={selectedCollection.name}
          />
        </>
      ) : (
        <div className={tokenPageStyles.container}>
          <div className={tokenPageStyles.metadataContainer}>
            <div className={tokenPageStyles.imageContainer}>
              <ThirdwebNftMedia
                metadata={selectedNft.metadata}
                className={tokenPageStyles.image}
              />
              <button
                onClick={() => setSelectedNft(null)}
                className={tokenPageStyles.crossButton}
              >
                X
              </button>
            </div>
          </div>

          <div className={tokenPageStyles.listingContainer}>
            <p>You&rsquo;re about to list the following item for sale.</p>
            <h1 className={tokenPageStyles.title}>
              {selectedNft.metadata.name}
            </h1>
            <p className={tokenPageStyles.collectionName}>
              Token ID #{selectedNft.metadata.id}
            </p>

            <SaleInfo
              nft={selectedNft}
              collectionName={selectedCollection.name}
            />
          </div>
        </div>
      )}
    </Container>
  );
}
