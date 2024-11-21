import asyncHandler from "#middlewares/asyncHandler";
import { AccountSchema } from "#models/wallet_Account_model";
import { WalletSchema } from "#models/wallet_model";
import { NetworkSchema } from "#models/wallet_network_model";
import { Wallet } from "ethers";


const generateWalletAccount = asyncHandler(async (req, res) => {

    let { seedPhrase = "", index = 0 } = req.body;

    let wallet;

    if (seedPhrase === "") {
        seedPhrase = Wallet.createRandom().mnemonic.phrase;
    }

    wallet = seedPhrase.includes(" ")
        ? Wallet.fromMnemonic(seedPhrase, `m/44'/60'/0'/0/${index}`)
        : new Wallet(seedPhrase);

    const { address } = wallet;

    const account = { address, privateKey: wallet.privateKey };

    const walletDoc = new WalletSchema({
        active_address: address
    });

    await walletDoc.save();

    const walletAccount = new AccountSchema({
        walletId: walletDoc._id,
        account_address: address,
    });

    await walletAccount.save();

    const networkDoc = new NetworkSchema({
        walletId: walletDoc._id,
        chainId: "1",
        name: "Ethereum Mainnet",
        blockExplorerUrl: "https://etherscan.io",
        rpcUrl: "https://etherscan.io"
    });

    await networkDoc.save();

    walletDoc.active_network_chainId = networkDoc.chainId;
    walletDoc.networks = networkDoc._id;
    await walletDoc.save();

    return res.status(200).json({ account, seedPhrase: seedPhrase.includes(" ") ? seedPhrase : "" });
});


const createOrImportAccount = asyncHandler(async (req, res) => {
    const { walletId, privateKey, index = 0 } = req.body;

    const walletDoc = await WalletSchema.findById(walletId);

    if (!walletDoc) {
        return res.status(404).json({ message: "Wallet not found" });
    }

    if (privateKey) {
        try {
            const importedWallet = new Wallet(privateKey);
            const { address } = importedWallet;


            const newAccount = new AccountSchema({
                walletId: walletDoc._id,
                account_address: address
            });

            await newAccount.save();

            return res.status(200).json({
                message: "Account imported successfully",
                account: { address }
            });
        } catch (error) {
            return res.status(400).json({ message: "Invalid private key" });
        }
    }

    try {

        const wallet = Wallet.fromMnemonic(walletDoc.active_address, `m/44'/60'/0'/0/${index}`);
        const { address, privateKey: newPrivateKey } = wallet;


        const newAccount = new AccountSchema({
            walletId: walletDoc._id,
            account_address: address,
        });

        await newAccount.save();

        return res.status(200).json({
            message: "Account created successfully",
            account: { address },
        });
    } catch (error) {
        return res.status(500).json({ message: "Error creating account" });
    }
});

export { generateWalletAccount, createOrImportAccount };