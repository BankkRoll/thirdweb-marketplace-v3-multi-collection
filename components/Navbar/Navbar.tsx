// components/Navbar/Navbar.tsx
import { ConnectWallet, ThirdwebSDK, useAddress } from "@thirdweb-dev/react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Navbar.module.css";
import {
  NFT_COLLECTION_ADDRESSES,
  NETWORK,
} from "../../const/contractAddresses";
import { useEffect, useRef, useState } from "react";

interface Collection {
  address: string;
  name: string;
  image?: string;
}

export function Navbar() {
  const address = useAddress();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredCollections, setFilteredCollections] = useState<Collection[]>(
    []
  );
  const [collections, setCollections] = useState<Collection[]>([]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const sdk = new ThirdwebSDK(NETWORK);
    const fetchCollections = async () => {
      const collectionData = await Promise.all(
        NFT_COLLECTION_ADDRESSES.map(async (collection) => {
          const contract = sdk.getContract(collection.address);
          const metadata = await (await contract).metadata.get();
          return {
            address: collection.address,
            name: metadata.name,
            image: metadata.image,
          };
        })
      );
      setCollections(collectionData);
    };

    fetchCollections();
  }, []);

  const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = collections.filter((collection) =>
      collection.name.toLowerCase().includes(query)
    );
    setFilteredCollections(filtered);
  };

  const handleCollectionSelect = () => {
    setSearchQuery("");
    setFilteredCollections([]);
  };

  const showDropdown = searchQuery.length > 0;

  return (
    <div className={styles.navContainer}>
      <nav className={styles.nav}>
        <div className={styles.navLeft}>
          <Link href="/" className={`${styles.homeLink} ${styles.navLeft}`}>
            <Image
              src="/logo.png"
              width={48}
              height={48}
              alt="NFT marketplace sample logo"
            />
          </Link>
        </div>

        <div className={styles.navCenter}>
          <div className={styles.relative} ref={dropdownRef}>
            <input
              type="text"
              placeholder="Search collections..."
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
              value={searchQuery}
              onChange={handleSearchQueryChange}
            />
            {showDropdown && (
              <div className={`${styles.absolute} search-results`}>
                <ul className={`${styles.collectionList}`}>
                  {filteredCollections.map((collection, index) => (
                    <li
                      key={index}
                      className={`${styles.collectionItem}`}
                      onClick={handleCollectionSelect}
                    >
                      <Link href={`/${collection.address}/buy`}>
                        <div className={`${styles.collectionImage}`}>
                          <img
                            src={collection.image}
                            width={32}
                            height={32}
                            alt={`${collection.name} Image`}
                          />
                        </div>
                        <div className={`${styles.collectionName}`}>
                          {collection.name}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className={styles.navRight}>
          <div className={styles.navConnect}>
            <ConnectWallet theme="dark" btnTitle="Connect Wallet" />
          </div>
          {address && (
            <Link className={styles.link} href={`/profile/${address}`}>
              <Image
                className={styles.profileImage}
                src="/user-icon.png"
                width={42}
                height={42}
                alt="Profile"
              />
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}
