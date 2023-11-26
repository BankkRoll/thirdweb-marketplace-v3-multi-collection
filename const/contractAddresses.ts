// const/contractAddresses.ts
/** Replace the values below with the addresses of your smart contracts. */

// 1. Set up the network your smart contracts are deployed to.
// First, import the chain from the package, then set the NETWORK variable to the chain.
import { Mumbai } from "@thirdweb-dev/chains";
export const NETWORK = Mumbai;

// 2. The address of the marketplace V3 smart contract.
// Deploy your own: https://thirdweb.com/thirdweb.eth/MarketplaceV3
export const MARKETPLACE_ADDRESS = "0x83c57ec0dF015eef8401fFb7CB7f66CfA8b6Ff55";

// 3. Multiple NFT collection smart contract addresses with names.
export const NFT_COLLECTION_ADDRESSES = [
  {
    address: "0x67b40fC017863743C520cDAec1B367BE1FD721f0" // The address of the NFT collection
  },
  {
    address: "0x436492DBc2E30E56FaC8F2297BD1964833c0687d"
  },
  {
    address: "0x67b40fC017863743C520cDAec1B367BE1FD721f0"
  }
  // You can add more collections as needed
];


// (Optional) Set up the URL of where users can view transactions on
// For example, below, we use Mumbai.polygonscan to view transactions on the Mumbai testnet.
export const ETHERSCAN_URL = "https://mumbai.polygonscan.com";
