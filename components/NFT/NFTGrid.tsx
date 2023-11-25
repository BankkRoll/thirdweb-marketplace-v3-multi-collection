// components/NFT/NFTGrid.tsx
import type { NFT as NFTType } from "@thirdweb-dev/sdk";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { NFT_COLLECTION_ADDRESSES } from "../../const/contractAddresses";
import Skeleton from "../Skeleton/Skeleton";
import NFT from "./NFT";
import styles from "../../styles/Buy.module.css";

type Props = {
  isLoading: boolean;
  data: NFTType[] | undefined;
  overrideOnclickBehavior?: (nft: NFTType) => void;
  emptyText?: string;
  collectionName: string;
};

export default function NFTGrid({
  isLoading,
  data,
  overrideOnclickBehavior,
  emptyText = "No NFTs found for this collection.",
  collectionName,
}: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const itemsPerPage = 20;
  const [displayedData, setDisplayedData] = useState<NFTType[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  const collection = NFT_COLLECTION_ADDRESSES.find(
    (c) => c.name === collectionName
  );
  const collectionAddress = collection?.address || "";

  useEffect(() => {
    if (data && data.length > 0) {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const slicedData = data.slice(startIndex, endIndex);
      setDisplayedData((prevData) => [...prevData, ...slicedData]);

      if (data.length <= displayedData.length) {
        setHasMoreItems(false);
      }
    }
  }, [data, currentPage]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100 &&
      hasMoreItems &&
      !isFetching
    ) {
      setIsFetching(true);
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsFetching(false);
  }, [displayedData, hasMoreItems]);

  return (
    <div className={styles.nftGridContainer}>
      {isLoading ? (
        [...Array(20)].map((_, index) => (
          <div key={index} className={styles.nftContainer}>
            <Skeleton key={index} width={"100%"} height="312px" />
          </div>
        ))
      ) : displayedData.length > 0 ? (
        displayedData.map((nft, index) => {
          const linkHref = `/token/${collectionAddress}/${nft.metadata.id}`;
          return !overrideOnclickBehavior ? (
            <Link
              href={linkHref}
              key={nft.metadata.id}
              className={styles.nftContainer}
            >
              <NFT nft={nft} collectionName={collectionName} />
            </Link>
          ) : (
            <div
              key={nft.metadata.id}
              className={styles.nftContainer}
              onClick={() => overrideOnclickBehavior(nft)}
            >
              <NFT nft={nft} collectionName={collectionName} />
            </div>
          );
        })
      ) : (
        <p>{emptyText}</p>
      )}
    </div>
  );
}
