
import express from "express";
import { getImportedTokensList } from "#controllers/Account.controller";

const accountRoute = express.Router();

accountRoute.route("/getImportedTokensList").post(getImportedTokensList);

export default accountRoute;