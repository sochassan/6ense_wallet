import express from "express";
import { generateWalletAccount, createOrImportAccount, getAccountsList, changeActiveAccount, changeActiveNetwork } from "#controllers/Wallet.controller"

const walletRoute = express.Router();

walletRoute.route("/generateWalletAccount").post(generateWalletAccount);
walletRoute.route("/createOrImportAccount").post(createOrImportAccount);
walletRoute.route("/changeActiveAccount").post(changeActiveAccount);
walletRoute.route("/changeActiveNetwork").post(changeActiveNetwork);

walletRoute.route("/getAccountsList/:walletId").get(getAccountsList);

export default walletRoute;
