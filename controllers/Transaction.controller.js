
import asyncHandler from "#middlewares/asyncHandler";
import { TransactionSchema } from "#models/account_transactions_model";
import { WalletSchema } from "#models/wallet_model";
import { NetworkSchema } from "#models/wallet_network_model";
import { ethers } from "ethers";

const sendToken = asyncHandler(async (req, res) => {

    const { walletId, amount, to, privateKey } = req.body

    let walletData = await WalletSchema.findById(walletId);

    console.log("🚀 ~ sendToken ~ walletData:", walletData)

    if (!walletData) {
        return res.status(400).json({ message: "Wallet not found" });
    }

    let receipt = "";
    let wallet = "";
    let networkData = "";

    try {

        networkData = await NetworkSchema.findById(walletData.active_network_id);
        
        console.log("🚀 ~ sendToken ~ networkData:", networkData)
        
        const provider = new ethers.providers.JsonRpcProvider(networkData.rpcUrl); // Creating provider

        wallet = new ethers.Wallet(privateKey, provider);

        const tx = { to, value: ethers.utils.parseEther(amount.toString()) };

        const transaction = await wallet.sendTransaction(tx);

        receipt = await transaction.wait();

        let transactons = new TransactionSchema({
            walletId: walletId,
            amount: amount,
            from: wallet.address,
            to: to,
            transaction_type: "send",
            status: "success",
            chainId: networkData.chainId,
            transaction_hash: receipt.hash,
        })

        await transactons.save();
        return res.status(200).json({
            staus: "sucess",
            receipt
        });
    } catch (error) {
        let transactons = new TransactionSchema({
            walletId: walletId,
            amount: amount,
            from: wallet.address,
            to: to,
            transaction_type: "send",
            status: "failed",
            chainId: networkData.chainId,
            transaction_hash: receipt.hash,
        })

        await transactons.save();
        return res.status(400).json({ status: false, message: "transaction failed", error: error });
    }

});

export { sendToken };
