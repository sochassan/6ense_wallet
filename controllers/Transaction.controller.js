
import asyncHandler from "#middlewares/asyncHandler";
import { TransactionSchema } from "#models/account_transactions_model";
import { WalletSchema } from "#models/wallet_model";
import { NetworkSchema } from "#models/wallet_network_model";
import { ethers } from "ethers";

const sendToken = asyncHandler(async (req, res) => {

    const { walletId, amount, to, privateKey } = req.body

    let walletData = await WalletSchema.findById(walletId);

    if (!walletData) {
        return res.status(400).json({ message: "Wallet not found" });
    }
    try {

        let networkData = await NetworkSchema.find({ chainId: walletData.active_network_chainId });

        const provider = new ethers.providers.JsonRpcProvider(networkData.rpcUrl); // Creating provider

        const wallet = new ethers.Wallet(privateKey, provider);

        const tx = { to, value: ethers.utils.parseEther(amount.toString()) };

        const transaction = await wallet.sendTransaction(tx);

        const receipt = await transaction.wait();

        let from = wallet.address;

        let transactons = new TransactionSchema({
            walletId: walletId,
            amount: amount,
            from: from,
            to: to,
            transaction_type: "transfer",
            status: "complete",
            chainId: walletData.active_network_chainId,
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
            from: from,
            to: to,
            transaction_type: "transfer",
            status: "failed",
            chainId: walletData.active_network_chainId,
            transaction_hash: receipt.hash,
        })

        await transactons.save();
        return res.status(400).json({ status: false, message: "transaction failed", error: error });
    }

});

export { sendToken };
