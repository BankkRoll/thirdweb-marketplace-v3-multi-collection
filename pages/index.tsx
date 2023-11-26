// pages/index.tsx
import type { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import styles from "../styles/Home.module.css";
import { NFT_COLLECTION_ADDRESSES, NETWORK } from "../const/contractAddresses";
import CollectionCard from "../components/Collection/CollectionCard";

interface CollectionMetadata {
  name: string;
  description: string;
  image: string;
}

const Home: NextPage = () => {
  const [collections, setCollections] = useState<CollectionMetadata[]>([]);

  useEffect(() => {
    const sdk = new ThirdwebSDK(NETWORK);
    const fetchCollections = async () => {
      const collectionData = await Promise.all(
        NFT_COLLECTION_ADDRESSES.map(async (collection) => {
          const contract = sdk.getContract(collection.address);
          const metadata = await (await contract).metadata.get();
          return {
            name: metadata.name,
            description: metadata.description || "No description available",
            image: metadata.image || "/logo.png",
          };
        })
      );
      setCollections(collectionData);
    };

    fetchCollections();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.hero}>
          <div className={styles.heroBackground}>
            <div className={styles.heroBackgroundInner}>
              <img
                src="/hero-gradient.png"
                width={1390}
                height={1390}
                alt="Background gradient from red to blue"
                className={styles.gradient}
              />
            </div>
          </div>

          <div className={styles.heroBodyContainer}>
            <div className={styles.heroBody}>
              <h1 className={styles.heroTitle}>
                <span className={styles.heroTitleGradient}>
                  Build NFT Marketplaces
                </span>
                <br />
                faster than ever.
              </h1>
              <p className={styles.heroSubtitle}>
                <Link
                  className={styles.link}
                  href="https://thirdweb.com"
                  target="_blank"
                >
                  thirdweb
                </Link>{" "}
                gives you the tools you need to create audited, performant, and
                flexible NFT marketplaces in <b>hours</b>, <i>not months</i>.
              </p>

              <div className={styles.heroCtaContainer}>
                <Link
                  className={styles.secondaryCta}
                  href="https://github.com/BankkRoll/thirdweb-marketplace-v3-multi-collection"
                  target="_blank"
                >
                  GitHub
                </Link>
              </div>
            </div>
          </div>
          <div className={styles.collectionContainer}>
            <h2 className={styles.collectionTitle}>Explore Collections</h2>
            <div className={styles.collectionGrid}>
              {collections.map((collection, index) => (
                <CollectionCard
                  contractAddress={NFT_COLLECTION_ADDRESSES[index].address}
                  key={index}
                  collectionName={collection.name}
                  description={collection.description}
                  imageUrl={collection.image}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
