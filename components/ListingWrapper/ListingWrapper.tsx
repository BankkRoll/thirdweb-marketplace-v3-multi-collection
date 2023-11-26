// components/ListingWrapper/ListingWrapper.tsx
import { useContract, useNFT } from "@thirdweb-dev/react";
import { DirectListingV3, EnglishAuction, ThirdwebSDK } from "@thirdweb-dev/sdk";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { NETWORK, NFT_COLLECTION_ADDRESSES } from "../../const/contractAddresses";
import styles from "../../styles/Buy.module.css";
import NFT from "../NFT/NFT";
import Skeleton from "../Skeleton/Skeleton";

type Props = {
  listing: DirectListingV3 | EnglishAuction;
  collectionName: string;
};

interface CollectionMetadata {
  name: string;
  address: string;
}

export default function ListingWrapper({ listing, collectionName }: Props) {
  const [collection, setCollection] = useState<CollectionMetadata | null>(null);

  useEffect(() => {
    const sdk = new ThirdwebSDK(NETWORK);
    const fetchCollections = async () => {
      const collectionData = await Promise.all(
        NFT_COLLECTION_ADDRESSES.map(async (collection) => {
          const contract = sdk.getContract(collection.address);
          const metadata = await (await contract).metadata.get();
          return {
            name: metadata.name,
            address: collection.address,
          };
        })
      );
      const selectedCollection = collectionData.find(
        (c) => c.name === collectionName
      );
      setCollection(selectedCollection || null);
    };

    fetchCollections();
  }, [collectionName]);

  const { contract: nftContract } = useContract(collection?.address || "");
  const { data: nft, isLoading } = useNFT(nftContract, listing.asset.id);

  if (!collection) {
    console.error(`Collection with name "${collectionName}" not found`);
    return null;
  }

  if (isLoading) {
    return (
      <div className={styles.nftContainer}>
        <Skeleton width={"100%"} height="312px" />
      </div>
    );
  }

  if (!nft) return null;

  return (
    <Link
      href={`/token/${collection.address}/${nft.metadata.id}`}
      key={nft.metadata.id}
      className={styles.nftContainer}
    >
      <NFT
        collectionAddress={collection.address}
        nft={nft}
        collectionName={collection.name}
      />
    </Link>
  );
}
