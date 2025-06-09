"use client";
import { useEffect, useState } from "react";
import V1InputField from "./ui/V1InputField";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

export default function Airdrop() {
  const [inputValue, setInputValue] = useState("");
  const wallet = useWallet();
  const [disableField, setDisableField] = useState(false);
  const connection = useConnection();

  useEffect(() => {
    if (!wallet.connected) {
      console.log("Wallet not connected");
      setDisableField(true);
    } else {
      console.log("Wallet connected");
      setDisableField(false);
    }
  }, [wallet.connected]);


  const handleAirdrop = async () => {
    if (wallet.publicKey) {
      await connection.connection.requestAirdrop(wallet.publicKey, parseFloat(inputValue) * 1e9);
      setInputValue("");
      alert(`Airdrop of ${inputValue} SOL requested!`);
    } else {
      console.error("Public key is null. Cannot request airdrop.");
    }
  }
  return (
    <div className="flex items-center justify-center h-[85vh] p-10 gap-4">
      <div className="flex flex-col items-center justify-center ">
        <h1 className="text-4xl font-bold mb-8">
          <span className="text-purple-500">Solana</span> Airdrop
        </h1>
        <div className="flex items-center justify-center gap-4">
          <V1InputField
            placeholder="Enter Amount"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={disableField}
          />
          <button
            onClick={handleAirdrop}
            className={`py-2 px-4 bg-purple-500 text-white rounded-lg  ${disableField ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            disabled={disableField}
          >
            Airdrop
          </button>
        </div>
      </div>
    </div>
  );
}
