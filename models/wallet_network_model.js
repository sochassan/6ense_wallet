import mongoose from "mongoose";

const WalletNetworkSchema = new mongoose.Schema(
    {
        walletId: { type: String, ref: "WalletSchema", require: true },
        chainId: { type: String, default: "1" },
        name: { type: String, default: "Ethereum Mainnet" },
        blockExplorerUrl: { type: String, default: "https://etherscan.io" },
        rpcUrl: { type: String, rpcUrl: "https://etherscan.io" }
    },
    { timestamps: true }
);

const NetworkSchema = mongoose.model("NetworkSchema", WalletNetworkSchema);

export { NetworkSchema };
