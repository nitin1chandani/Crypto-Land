"use client";

import { useEffect, useState } from "react";
import V1InputField from "./ui/V1InputField";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import {
  Keypair,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import {
  TOKEN_2022_PROGRAM_ID,
  getMintLen,
  createInitializeInstruction,
  createInitializeMetadataPointerInstruction,
  createInitializeMintInstruction,
  ExtensionType,
  TYPE_SIZE,
  LENGTH_SIZE,
  // pack, // Removed: not exported from @solana/spl-token
} from "@solana/spl-token";

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
  const [disableField, setDisableField] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const wallet = useWallet();
  const { connection } = useConnection();

  useEffect(() => {
    const { name, symbol, logo, supply } = tokenDetails;
    if (!wallet.connected || !name || !symbol || !supply) {
      setDisableField(true);
    } else {
      setDisableField(false);
    }
  }, [wallet.connected, tokenDetails]);

  const handleCreateToken = async () => {
    if (!wallet.publicKey) return;

    try {
      setStatus("⏳ Creating token...");
      const mintKeypair = Keypair.generate();

      const metadata = {
        mint: mintKeypair.publicKey,
        name: tokenDetails.name,
        symbol: tokenDetails.symbol.padEnd(10, " ").slice(0, 10),
        uri: tokenDetails.logo,
        additionalMetadata: [],
      };

      const mintLen = getMintLen([ExtensionType.MetadataPointer]);
      // You may need to replace this with the correct serialization or a fixed length if known
      const metadataLen = TYPE_SIZE + LENGTH_SIZE + 100; // Replace 100 with the actual metadata length if known
      const lamports = await connection.getMinimumBalanceForRentExemption(
        mintLen + metadataLen
      );

      const transaction = new Transaction().add(
        SystemProgram.createAccount({
          fromPubkey: wallet.publicKey,
          newAccountPubkey: mintKeypair.publicKey,
          space: mintLen,
          lamports,
          programId: TOKEN_2022_PROGRAM_ID,
        }),
        createInitializeMetadataPointerInstruction(
          mintKeypair.publicKey,
          wallet.publicKey,
          mintKeypair.publicKey,
          TOKEN_2022_PROGRAM_ID
        ),
        createInitializeMintInstruction(
          mintKeypair.publicKey,
          9, // decimals
          wallet.publicKey,
          null,
          TOKEN_2022_PROGRAM_ID
        ),
        createInitializeInstruction({
          programId: TOKEN_2022_PROGRAM_ID,
          mint: mintKeypair.publicKey,
          metadata: mintKeypair.publicKey,
          name: metadata.name,
          symbol: metadata.symbol,
          uri: metadata.uri,
          mintAuthority: wallet.publicKey,
          updateAuthority: wallet.publicKey,
        })
      );

      transaction.feePayer = wallet.publicKey;
      transaction.recentBlockhash = (
        await connection.getLatestBlockhash()
      ).blockhash;
      transaction.partialSign(mintKeypair);

      const txId = await wallet.sendTransaction(transaction, connection);
      await connection.confirmTransaction(txId, "confirmed");

      setStatus(
        `✅ Token Minted!\nMint Address: ${mintKeypair.publicKey.toBase58()}\nTx: ${txId}`
      );
    } catch (err: any) {
      console.error(err);
      setStatus(`❌ Error: ${err.message}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 h-[calc(100vh-55px)] p-10">
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
        onClick={handleCreateToken}
        className={`py-2 px-4 bg-purple-500 text-white rounded-lg ${
          disableField ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        }`}
        disabled={disableField}
      >
        Create Token
      </button>

      {status && (
        <pre className="mt-6 p-4 bg-gray-100 rounded-md whitespace-pre-wrap max-w-xl text-sm text-black">
          {status}
        </pre>
      )}
    </div>
  );
}
