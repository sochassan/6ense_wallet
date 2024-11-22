
import express from "express";
import { getImportedTokensList } from "#controllers/Account.controller";
import { addNft, addToken } from "#controllers/Account.Tokens.controller";

const accountRoute = express.Router();

accountRoute.route("/addToken").post(addToken);
accountRoute.route("/addNft").post(addNft);
accountRoute.route("/getImportedTokensList/:walletId").get(getImportedTokensList);

export default accountRoute;