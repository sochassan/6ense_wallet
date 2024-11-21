import asyncHandler from "#middlewares/asyncHandler";
import { WalletSchema } from "#models/wallet_model";
import { NetworkSchema } from "#models/wallet_network_model";

const getAddedNetworksList = asyncHandler(async (req, res) => {

    const { walletId } = req.body;

    let wallet = await WalletSchema.findById(walletId);
    if (!wallet) {
        return res.status(400).json({
            status: false,
            message: "wallet not found"
        })
    }
    let network = await NetworkSchema.findById(wallet._id);
    if (!network) {
        return res.status(400).json({
            status: false,
            message: "network not found"
        })
    }
    return res.status(200).json({
        status: true,
        message: "Succesfully get",
        network
    })
})


export { getAddedNetworksList }