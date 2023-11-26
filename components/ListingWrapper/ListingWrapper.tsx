// components/ListingWrapper/ListingWrapper.tsx
import { useContract, useNFT } from "@thirdweb-dev/react";
import { DirectListingV3, EnglishAuction } from "@thirdweb-dev/sdk";
import Link from "next/link";
import React from "react";
import { NFT_COLLECTION_ADDRESSES } from "../../const/contractAddresses";
import styles from "../../styles/Buy.module.css";
import NFT from "../NFT/NFT";
import Skeleton from "../Skeleton/Skeleton";

type Props = {
  listing: DirectListingV3 | EnglishAuction;
  collectionName: string;
};

export default function ListingWrapper({ listing, collectionName }: Props) {
  const collection = NFT_COLLECTION_ADDRESSES.find(
    (collection) => collection.name === collectionName
  );
  const collectionAddress = collection?.address || "";

  const { contract: nftContract } = useContract(collectionAddress);
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
      <NFT collectionAddress={collectionAddress} nft={nft} collectionName={collectionName} />
    </Link>
  );
}
