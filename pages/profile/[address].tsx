import {
  useContract,
  useOwnedNFTs,
  useValidDirectListings,
  useValidEnglishAuctions,
  useMetadata,
} from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Container from "../../components/Container/Container";
import ListingWrapper from "../../components/ListingWrapper/ListingWrapper";
import NFTGrid from "../../components/NFT/NFTGrid";
import Skeleton from "../../components/Skeleton/Skeleton";
import {
  MARKETPLACE_ADDRESS,
  NFT_COLLECTION_ADDRESSES,
} from "../../const/contractAddresses";
import styles from "../../styles/Profile.module.css";
import randomColor from "../../util/randomColor";
import Sell from "../../components/SellingWrapper/sell";

interface CollectionMetadata {
  name: string;
  description?: string;
  image?: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [tab, setTab] = useState<"nfts" | "listings" | "auctions" | "sell">(
    "nfts"
  );
  const [randomColor1, randomColor2, randomColor3, randomColor4] = [
    randomColor(),
    randomColor(),
    randomColor(),
    randomColor(),
  ];

  const { collectionAddress } = router.query;

  const { contract: nftCollection } = useContract(collectionAddress as string);
  const { contract: marketplace } = useContract(
    MARKETPLACE_ADDRESS,
    "marketplace-v3"
  );

  const { data: ownedNfts, isLoading: loadingOwnedNfts } = useOwnedNFTs(
    nftCollection,
    router.query.address as string
  );
  const { data: directListings, isLoading: loadingDirects } =
    useValidDirectListings(marketplace, {
      seller: router.query.address as string,
    });
  const { data: auctionListings, isLoading: loadingAuctions } =
    useValidEnglishAuctions(marketplace, {
      seller: router.query.address as string,
    });

  const { data: collectionMetadata } = useMetadata(nftCollection) as {
    data: CollectionMetadata | undefined;
  };

  const collectionName = collectionMetadata?.name || "Unknown Collection";

  useEffect(() => {
    // Update the tab state based on router query
    if (router.query.tab) {
      setTab(router.query.tab as typeof tab);
    }
  }, [router.query.tab]);

  return (
    <Container maxWidth="lg">
      <div className={styles.profileHeader}>
        <div
          className={styles.coverImage}
          style={{
            background: `linear-gradient(90deg, ${randomColor1}, ${randomColor2})`,
          }}
        />
        <div
          className={styles.profilePicture}
          style={{
            background: `linear-gradient(90deg, ${randomColor3}, ${randomColor4})`,
          }}
        />
        <h1 className={styles.profileName}>
          {router.query.address ? (
            router.query.address.toString().substring(0, 4) +
            "..." +
            router.query.address.toString().substring(38, 42)
          ) : (
            <Skeleton width="320" />
          )}
        </h1>
      </div>

      <div className={styles.tabs}>
        <h3
          className={`${styles.tab} 
        ${tab === "nfts" ? styles.activeTab : ""}`}
          onClick={() => setTab("nfts")}
        >
          NFTs
        </h3>
        <h3
          className={`${styles.tab} 
        ${tab === "sell" ? styles.activeTab : ""}`}
          onClick={() => setTab("sell")}
        >
          Sell
        </h3>
        <h3
          className={`${styles.tab} 
        ${tab === "listings" ? styles.activeTab : ""}`}
          onClick={() => setTab("listings")}
        >
          Listings
        </h3>
        <h3
          className={`${styles.tab}
        ${tab === "auctions" ? styles.activeTab : ""}`}
          onClick={() => setTab("auctions")}
        >
          Auctions
        </h3>
      </div>

      <div
        className={tab === "nfts" ? styles.activeTabContent : styles.tabContent}
      >
        <NFTGrid
          data={ownedNfts}
          isLoading={loadingOwnedNfts}
          emptyText={`Looks like you don't have any NFTs in the ${collectionName} collection.`}
          collectionName={collectionName}
          collectionAddress={collectionAddress as string}
        />
      </div>

      <div
        className={tab === "sell" ? styles.activeTabContent : styles.tabContent}
      >
        <Sell />
      </div>

      <div
        className={
          tab === "listings" ? styles.activeTabContent : styles.tabContent
        }
      >
        {directListings?.map((listing) => (
          <ListingWrapper
            listing={listing}
            key={listing.id}
            collectionName={collectionName}
          />
        ))}
      </div>

      <div
        className={
          tab === "auctions" ? styles.activeTabContent : styles.tabContent
        }
      >
        {auctionListings?.map((listing) => (
          <ListingWrapper
            listing={listing}
            key={listing.id}
            collectionName={collectionName}
          />
        ))}
      </div>
    </Container>
  );
}
