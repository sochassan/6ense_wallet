import asyncHandler from "#middlewares/asyncHandler";
import { NftSchema } from "#models/account_nft_model";
import { TokensSchema } from "#models/account_Tokens_model";
import { AccountSchema } from "#models/wallet_Account_model";



const addToken = asyncHandler(async (req, res) => {

    const { accountId, token_contract_address, token_symbol, token_decimal } = req.body;

    if (!accountId || !token_contract_address || !token_symbol || !token_decimal) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const account = await AccountSchema.findById(accountId);
    if (!account) {
        return res.status(404).json({ message: "Account not found" });
    }

    const existingToken = await TokensSchema.findOne({ accountId, token_contract_address });
    if (existingToken) {
        return res.status(400).json({ message: "Token already exists for this account" });
    }

    const newToken = new TokensSchema({
        accountId,
        token_contract_address,
        token_symbol,
        token_decimal
    });

    await newToken.save();

    return res.status(201).json({
        message: "Token added successfully",
        token: newToken
    });
});




const addNft = asyncHandler(async (req, res) => {

    const { accountId, token_contract_address, token_id } = req.body;

    if (!accountId || !token_contract_address || !token_id) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const account = await AccountSchema.findById(accountId);
    if (!account) {
        return res.status(404).json({ message: "Account not found" });
    }

    const existingNft = await NftSchema.findOne({ accountId, token_contract_address, token_id });
    if (existingNft) {
        return res.status(400).json({ message: "NFT already exists for this account" });
    }

    const newNft = new NftSchema({
        accountId,
        token_contract_address,
        token_id
    });

    await newNft.save();

    return res.status(201).json({
        message: "NFT added successfully",
        nft: newNft
    });
});

export { addToken, addNft };