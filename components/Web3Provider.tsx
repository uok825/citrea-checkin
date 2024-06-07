import { WagmiProvider, createConfig, http } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";

import { type Chain } from "viem";

export const citrea = {
  id: 62298,
  name: "Citrea Devnet",
  nativeCurrency: { name: "Bitcoin", symbol: "cBtc", decimals: 8 },
  rpcUrls: {
    default: { http: ["https://rpc.devnet.citrea.xyz"] },
  },
  blockExplorers: {
    default: { name: "Citrea Scan", url: "https://explorer.devnet.citrea.xyz" },
  },
} as const satisfies Chain;

const config = createConfig(
  getDefaultConfig({
    chains: [citrea],
    transports: {
      [citrea.id]: http(`https://rpc.devnet.citrea.xyz`),
    },

    // Required API Keys
    walletConnectProjectId:
      process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "",

    // Required App Info
    appName: "Citrea CheckInner",

    // Optional App Info
    appDescription: "Your App Description",
    appUrl: "https://family.co", // your app's url
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  })
);

import { ReactNode } from "react";

const queryClient = new QueryClient();

export const Web3Provider = ({ children }: { children: ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
