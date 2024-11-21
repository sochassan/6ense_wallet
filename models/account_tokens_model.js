import mongoose from "mongoose";

const AccountTokensSchema = new mongoose.Schema(
    {
        accountId: { type: String, ref: "AccountSchema", require: true },
        token_contract_address: { type: String, unique: true},
        token_symbol: { type: String },
        token_decimal: { type: String },
    },
    { timestamps: true }
);

const TokensSchema = mongoose.model("TokensSchema", AccountTokensSchema);

export { TokensSchema };
