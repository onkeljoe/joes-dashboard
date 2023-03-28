/* eslint-disable @typescript-eslint/no-unused-vars */

// TODO: remove unused vars if not needed

import type { Chain } from "wagmi";
import { configureChains, createClient } from "wagmi";

import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

import { publicProvider } from "wagmi/providers/public";
import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { fantom } from 'wagmi/chains'

export const { chains, provider, webSocketProvider } = configureChains(
  [fantom],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "beetswars live",
  chains,
});

export const client = createClient({
  autoConnect: false,
  connectors,
  provider,
  webSocketProvider,
});
