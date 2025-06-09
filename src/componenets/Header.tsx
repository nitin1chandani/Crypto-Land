"use client";
import React, { useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletDisconnectButton,
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import "@solana/wallet-adapter-react-ui/styles.css";
import { useRouter } from "next/navigation";

export default function Header() {
    const router = useRouter();

  return (
    <ConnectionProvider endpoint="https://api.mainnet-beta.solana.com">
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <header className="flex justify-between items-center p-2 sticky top-0 shadow-md z-50 h-[10vh] ">
            <h1 className="text-2xl font-bold text-purple-500 cursor-pointer" onClick={() => router.push("/")}>CryptoLand</h1>
            <div className="flex items-center gap-4 text-gray-200 ">
                <div className="hover:text-purple-500 cursor-pointer" onClick={() => router.push("/airdrop")}>Airdrop</div>
                <div className="hover:text-purple-500 cursor-pointer" onClick={() => router.push("/token-launchpad")}>Token Launchpad</div>
            </div>
            <div className="flex items-center gap-4">
              <WalletMultiButton />
              <WalletDisconnectButton />
            </div>
          </header>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}