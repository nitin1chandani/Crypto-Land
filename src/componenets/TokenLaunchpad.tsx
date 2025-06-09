"use client";
import { useState } from "react";
import V1InputField from "./ui/V1InputField";

interface TokenDetails {
  name: string;
  symbol: string;
  logo: string;
  supply: string;
}

export default function TokenLaunchpad() {
  const [tokenDetails, setTokenDetails] = useState<TokenDetails>({
    name: "",
    symbol: "",
    logo: "",
    supply: "",
  });
  return (
    <div className="flex flex-col items-center justify-center gap-4 h-calc(100vh - 55px) p-10">
      <h1 className="text-4xl font-bold mb-8">
        <span className="text-purple-500">Solana</span> Token Launchpad
      </h1>
      <div className="flex flex-col items-center space-y-4">
        <V1InputField
          placeholder="Enter token name"
          value={tokenDetails.name}
          onChange={(e) =>
            setTokenDetails({ ...tokenDetails, name: e.target.value })
          }
        />
        <V1InputField
          placeholder="Enter token symbol"
          value={tokenDetails.symbol}
          onChange={(e) =>
            setTokenDetails({ ...tokenDetails, symbol: e.target.value })
          }
        />
        <V1InputField
          placeholder="Enter token logo URL"
          value={tokenDetails.logo}
          onChange={(e) =>
            setTokenDetails({ ...tokenDetails, logo: e.target.value })
          }
        />
        <V1InputField
          placeholder="Enter token supply"
          value={tokenDetails.supply}
          onChange={(e) =>
            setTokenDetails({ ...tokenDetails, supply: e.target.value })
          }
        />
      </div>
      <button
        onClick={() => console.log("Token Details:", tokenDetails)}
        className="py-2 px-4 bg-purple-500 text-white rounded-lg cursor-pointer"
      >
        Create Token
      </button>
    </div>
  );
}
