import mongoose from "mongoose";

const AccountNftSchema = new mongoose.Schema(
    {
        accountId: { type: String, ref: "AccountSchema", require: true },
        token_contract_address: { type: String, unique: true },
        token_id: { type: String }
    },
    { timestamps: true }
);

const NftSchema = mongoose.model("NftSchema", AccountNftSchema);

export { NftSchema };