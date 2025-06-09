"use client";
import React from "react";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";

export default function Home() {
  return (
    <main className="h-screen flex flex-col items-center justify-center">
      <div className="bg-white bg-opacity-80 rounded-2xl shadow-xl p-10 flex flex-col items-center max-w-lg w-full">
        <h1 className="text-4xl font-extrabold text-purple-700 mb-2 text-center">
          Welcome to CryptoLand!
        </h1>
        <p className="text-lg text-gray-700 mb-6 text-center">
          Explore the Solana blockchain: check balances, request airdrops, and
          launch your own tokens. Connect your wallet to get started!
        </p>
        <div className="flex gap-4 mb-4">
          <WalletMultiButton className="!bg-purple-500 !text-white !rounded-lg !px-6 !py-2 !font-semibold hover:!bg-purple-600 transition" />
          <WalletDisconnectButton className="!bg-gray-200 !text-purple-700 !rounded-lg !px-6 !py-2 !font-semibold hover:!bg-gray-300 transition" />
        </div>
        <div className="flex flex-col gap-2 w-full mt-4">
          <a
            href="/balance"
            className="block w-full text-center py-2 rounded-lg bg-purple-100 text-purple-700 font-medium hover:bg-purple-200 transition"
          >
            Check Balance
          </a>
          <a
            href="/airdrop"
            className="block w-full text-center py-2 rounded-lg bg-blue-100 text-blue-700 font-medium hover:bg-blue-200 transition"
          >
            Airdrop SOL
          </a>
          <a
            href="/token-launchpad"
            className="block w-full text-center py-2 rounded-lg bg-green-100 text-green-700 font-medium hover:bg-green-200 transition"
          >
            Token Launchpad
          </a>
        </div>
      </div>
      <footer className="mt-10 text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} CryptoLand. Powered by Solana.
      </footer>
    </main>
  );
}
