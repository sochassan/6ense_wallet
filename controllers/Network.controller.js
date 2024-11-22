import asyncHandler from "#middlewares/asyncHandler";
import { WalletSchema } from "#models/wallet_model";
import { NetworkSchema } from "#models/wallet_network_model";

const getAddedNetworksList = asyncHandler(async (req, res) => {

    const { walletId } = req.params;

    const wallet = await WalletSchema.findById(walletId).populate("networks");
    if (!wallet) {
        return res.status(400).json({
            status: false,
            message: "wallet not found"
        })
    }
    let networks = wallet.networks

    return res.status(200).json({
        status: true,
        message: "Succesfully get",
        networks
    })
});


const addNetwork = asyncHandler(async (req, res) => {

    const { walletId, chainId, name, blockExplorerUrl, rpcUrl } = req.body;

    if (!walletId || !chainId || !name || !rpcUrl) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const wallet = await WalletSchema.findById(walletId);
    if (!wallet) {
        return res.status(404).json({ message: "Wallet not found" });
    }

    const newNetwork = new NetworkSchema({
        walletId,
        chainId,
        name,
        blockExplorerUrl,
        rpcUrl
    });

    await newNetwork.save();

    wallet.networks.push(newNetwork._id);
    
    await wallet.save();

    return res.status(201).json({
        message: "Network added successfully",
        network: newNetwork
    });
});


export { getAddedNetworksList, addNetwork }