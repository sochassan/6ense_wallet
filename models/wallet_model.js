import mongoose from "mongoose";

const NewWalletSchema = new mongoose.Schema(
    {
        wallet_default_address: { type: String },
        active_account_id: { type: String, ref: "AccountSchema" },
        account: [{ type: String, ref: "AccountSchema" }],
        active_network_id: { type: String, ref: "NetworkSchema" },
        networks: [{ type: String, ref: "NetworkSchema" }]
    },
    { timestamps: true }
);

const WalletSchema = mongoose.model("WalletSchema", NewWalletSchema);

export { WalletSchema };
