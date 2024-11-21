import { STATUS, TRANSACTION } from "#constant/constant";
import mongoose from "mongoose";

const WalletTransactionSchema = new mongoose.Schema(
    {
        walletId: { type: String, ref: "WalletSchema", require: true },
        amount: { type: Number },
        from: { type: String },
        to: { type: String },
        transaction_type: { type: String, enum: TRANSACTION },
        status: { type: String, enum: STATUS },
        chainId: { type: String },
        transaction_hash: { type: String }
    },
    { timestamps: true }
);

const TransactionSchema = mongoose.model("TransactionSchema", WalletTransactionSchema);

export { TransactionSchema };
