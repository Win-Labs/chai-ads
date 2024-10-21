import { http, createConfig, injected } from "@wagmi/core";
import { defineChain } from "viem";

export const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
export const contractAbi = [];

export const localhost = /*#__PURE__*/ defineChain({
  id: 31337,
  name: "Localhost",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH",
  },
  rpcUrls: {
    default: { http: ["http://127.0.0.1:8545"] },
  },
});

export const config = createConfig({
  chains: [localhost],
  transports: {
    [localhost.id]: http(),
  },
  connectors: [injected()],
});
