"use client";
import { useState } from "react";
import { Connection } from "@solana/web3.js";

export default function Balance() {
    const [address, setAddress] = useState("");
    const [balance, setBalance] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [network, setNetwork] = useState("devnet");

    const handleCheckBalance = async () => {
        setError(null);
        setBalance(null);
        setLoading(true);
        try {
            const pubkey = address.trim();
            if (!pubkey) throw new Error("Please enter a public address.");
            // Select endpoint based on network
            const endpoint = network === "mainnet"
                ? "https://solana-mainnet.g.alchemy.com/v2/4qaVLMXJXoxalSmOND5pN35e2Vh9B_uL"
                : "https://solana-devnet.g.alchemy.com/v2/4qaVLMXJXoxalSmOND5pN35e2Vh9B_uL";
            const tempConnection = new Connection(endpoint);
            const lamports = await tempConnection.getBalance({ toBase58: () => pubkey } as unknown as import("@solana/web3.js").PublicKey);
            setBalance((lamports / 1e9).toLocaleString() + " SOL");
        } catch (err) {
            const error = err as Error;
            setError(error.message || "Invalid address or network error.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center gap-4 p-10">
            <h1 className="text-3xl font-bold mb-4">Check SOL Balance</h1>
            <div className="relative w-80 mb-2">
                <select
                    className="appearance-none p-2 border border-purple-400 rounded-lg focus:outline-none w-full pr-10 bg-white text-black"
                    value={network}
                    onChange={e => setNetwork(e.target.value)}
                >
                    <option value="devnet" className="text-black">Devnet</option>
                    <option value="mainnet" className="text-black">Mainnet</option>
                </select>
                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-purple-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                </span>
            </div>
            <input
                type="text"
                className="p-2 border border-purple-400 rounded-lg focus:outline-none w-80"
                placeholder="Enter public address"
                value={address}
                onChange={e => setAddress(e.target.value)}
            />
            <button
                className="py-2 px-4 bg-purple-500 text-white rounded-lg disabled:opacity-50"
                onClick={handleCheckBalance}
                disabled={loading || !address.trim()}
            >
                {loading ? "Checking..." : "Check Balance"}
            </button>
            {balance && <div className="mt-2 text-green-700 font-semibold">Balance: {balance}</div>}
            {error && <div className="mt-2 text-red-600">{error}</div>}
        </div>
    );
}