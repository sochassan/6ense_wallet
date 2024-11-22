import asyncHandler from "#middlewares/asyncHandler";
import { NftSchema } from "#models/account_nft_model";
import { TokensSchema } from "#models/account_Tokens_model";
import { WalletSchema } from "#models/wallet_model";

const getImportedTokensList = asyncHandler(async (req, res) => {

    const { walletId } = req.params;

    let wallet = await WalletSchema.findById(walletId).populate("active_account_id")

    if (!wallet) {
        return res.status(400).json({
            status: false,
            message: "wallet not found"
        })
    }

    let tokens = await TokensSchema.find({ accountId: wallet.active_account_id._id });

    let nftTokens = await NftSchema.find({ accountId: wallet.active_account_id._id });

    return res.status(200).json({
        status: true,
        message: "Succesfully get",
        tokens,
        nftTokens
    })
})

export { getImportedTokensList }