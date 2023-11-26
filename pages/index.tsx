import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { NFT_COLLECTION_ADDRESSES } from "../const/contractAddresses";
import CollectionCard from "../components/Collection/CollectionCard";

/**
 * Landing page with a simple gradient background and a hero asset.
 * Free to customize as you see fit.
 */
const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.hero}>
          <div className={styles.heroBackground}>
            <div className={styles.heroBackgroundInner}>
              <Image
                src="/hero-gradient.png"
                width={1390}
                height={1390}
                alt="Background gradient from red to blue"
                quality={100}
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
                  className={styles.link}
                  href="https://thirdweb.com"
                  target="_blank"
                >
                  Get Started
                </Link>
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
              {NFT_COLLECTION_ADDRESSES.map((collection, index) => (
                <CollectionCard
                  key={index}
                  collectionName={collection.name}
                  description={collection.description}
                  imageUrl={collection.imageUrl}
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
