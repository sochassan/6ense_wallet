import mongoose from "mongoose";

const NewWalletSchema = new mongoose.Schema(
    {
        active_address: { type: String, ref: "AccountSchema" },
        active_network_chainId : { type: String, default: "1"},
        networks: [{ type: String, ref: "NetworkSchema" }]

    },
    { timestamps: true }
);

const WalletSchema = mongoose.model("WalletSchema", NewWalletSchema);

export { WalletSchema };
