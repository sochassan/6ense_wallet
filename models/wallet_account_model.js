import mongoose from "mongoose";

const WalletAccountSchema = new mongoose.Schema(
    {
        walletId: { type: String, ref: "WalletSchema", require: true },
        account_address : {type:String},
        imported_Tokens: { type: String, ref: "WalletSchema" },
    },
    { timestamps: true }
);

const AccountSchema = mongoose.model("AccountSchema", WalletAccountSchema);

export { AccountSchema };
