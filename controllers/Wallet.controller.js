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
        wallet_default_address: address
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

    walletDoc.active_network_id = networkDoc._id;
    walletDoc.active_account_id = walletAccount._id;
    walletDoc.networks.push(networkDoc._id);
    walletDoc.account.push(walletAccount._id);
    await walletDoc.save();

    return res.status(200).json({ account, seedPhrase: seedPhrase.includes(" ") ? seedPhrase : ""   , walletDoc });
});

const createOrImportAccount = asyncHandler(async (req, res) => {

    let { walletId, privateKey, index = 0, seedPhrase = "" } = req.body;

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

            walletDoc.account.push(newAccount._id);

            await walletDoc.save();

            return res.status(200).json({
                message: "Account imported successfully",
                account: { address }
            });
        } catch (error) {
            return res.status(400).json({ message: "Invalid private key" });
        }
    }

    try {

        let wallet;

        if (seedPhrase === "") {
            seedPhrase = Wallet.createRandom().mnemonic.phrase;
        }

        wallet = seedPhrase.includes(" ")
            ? Wallet.fromMnemonic(seedPhrase, `m/44'/60'/0'/0/${index}`)
            : new Wallet(seedPhrase);

        console.log("Testing2");
        const newAccount = new AccountSchema({
            walletId: walletDoc._id,
            account_address: wallet?.address,
        });

        await newAccount.save();

        walletDoc.account.push(newAccount._id);
        await walletDoc.save();

        console.log("Testing3");

        return res.status(200).json({
            message: "Account created successfully"
        });
    } catch (error) {
        console.log("🚀 ~ createOrImportAccount ~ error:", error)
        return res.status(500).json({ message: "Error creating account" });
    }
});

const getAccountsList = asyncHandler(async (req, res) => {
    const { walletId } = req.params;  // Extract walletId from URL parameters

    // Find the wallet document by walletId
    const walletDoc = await WalletSchema.findById(walletId).populate("account");

    if (!walletDoc) {
        return res.status(404).json({ message: "Wallet not found" });
    }

    // Get the accounts list (populated with account details)
    const accounts = walletDoc.account;  // This will be an array of populated AccountSchema documents

    return res.status(200).json({
        message: "Accounts fetched successfully",
        accounts
    });
});

const changeActiveAccount = asyncHandler(async (req, res) => {
    const { walletId, accountId } = req.body;

    if (!walletId || !accountId) {
        return res.status(400).json({ message: "Missing walletId or accountId" });
    }


    const wallet = await WalletSchema.findById(walletId);
    if (!wallet) {
        return res.status(404).json({ message: "Wallet not found" });
    }

    const account = await AccountSchema.findById(accountId);
    if (!account) {
        return res.status(404).json({ message: "Account not found" });
    }


    wallet.active_account_id = accountId;
    await wallet.save();
    return res.status(200).json({
        message: "Active account changed successfully",
        active_address: accountId.account_address
    });
});

const changeActiveNetwork = asyncHandler(async (req, res) => {
    const { walletId, networkId } = req.body;


    if (!walletId || !networkId) {
        return res.status(400).json({ message: "Missing walletId or networkId" });
    }


    const wallet = await WalletSchema.findById(walletId);
    if (!wallet) {
        return res.status(404).json({ message: "Wallet not found" });
    }


    const network = await NetworkSchema.findById(networkId);
    if (!network) {
        return res.status(404).json({ message: "Network not found" });
    }


    wallet.active_network_id = networkId;
    await wallet.save();

    return res.status(200).json({
        message: "Active network changed successfully",
        active_network_id: wallet.active_network_id
    });
});


export { generateWalletAccount, createOrImportAccount, getAccountsList, changeActiveAccount, changeActiveNetwork };