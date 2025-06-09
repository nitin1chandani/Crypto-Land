"use client";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  WalletMultiButton,
  WalletDisconnectButton,
} from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const router = useRouter();
  const wallet = useWallet();
  const connected = wallet.connected;
  const [balance, setBalance] = useState<number | null>(null);

  // Add mounted flag
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const getBalance = async () => {
    if (!wallet.publicKey) return;

    const RPCURL =
      "https://solana-devnet.g.alchemy.com/v2/4qaVLMXJXoxalSmOND5pN35e2Vh9B_uL";
    const response = await fetch(RPCURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "getBalance",
        params: [wallet.publicKey.toBase58()],
      }),
    });
    const data = await response.json();
    const lamports = data.result.value;
    const sol = lamports / 1e9;
    setBalance(sol);
  };

  useEffect(() => {
    if (connected && wallet.publicKey) {
      getBalance();
    }
  }, [connected, wallet.publicKey]);

  return (
    <header className="flex justify-between items-center p-2 sticky top-0 shadow-md z-50 h-[10vh]">
      <h1
        className="text-2xl font-bold text-purple-500 cursor-pointer"
        onClick={() => router.push("/")}
      >
        CryptoLand
      </h1>
      <div className="flex items-center gap-4 text-gray-200">
        <div
          className="hover:text-purple-500 cursor-pointer"
          onClick={() => router.push("/airdrop")}
        >
          Airdrop
        </div>
        <div
          className="hover:text-purple-500 cursor-pointer"
          onClick={() => router.push("/token-launchpad")}
        >
          Token Launchpad
        </div>
        <div
          className="hover:text-purple-500 cursor-pointer"
          onClick={() => router.push("/balance")}
        >
          Balance
        </div>
      </div>
      <div className="flex items-center gap-4">
        {connected && balance !== null && (
          <div className="bg-purple-500 p-3 rounded-md text-white">
            {balance.toFixed(2)} SOL
          </div>
        )}

        {/* Render wallet buttons only on client */}
        {hasMounted && (
          <>
            <WalletMultiButton />
            <WalletDisconnectButton />
          </>
        )}
      </div>
    </header>
  );
}
