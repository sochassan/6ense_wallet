import express from "express";
import { generateWalletAccount, createOrImportAccount } from "#controllers/Wallet.controller"

const walletRoute = express.Router();

walletRoute.route("/generateWalletAccount").post(generateWalletAccount);
walletRoute.route("/createOrImportAccount").post(createOrImportAccount);

export default walletRoute;
