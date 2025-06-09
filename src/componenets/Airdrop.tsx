"use client";
import { useState } from "react";
import V1InputField from "./ui/V1InputField";

export default function Airdrop() {
  const [inputValue, setInputValue] = useState("");
  return (
    <div className="flex items-center justify-center h-calc(100vh - 55px) p-10 gap-4">
      <div className="flex flex-col items-center justify-center ">
        <h1 className="text-4xl font-bold mb-8">
          <span className="text-purple-500">Solana</span> Airdrop
        </h1>
        <div className="flex items-center justify-center gap-4">
          <V1InputField
            placeholder="Enter Amount"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            onClick={() => console.log("Airdrop Amount:", inputValue)}
            className="py-2 px-4 bg-purple-500 text-white rounded-lg cursor-pointer"
          >
            Airdrop
          </button>
        </div>
      </div>
    </div>
  );
}
