import express from "express";
import { addNetwork, getAddedNetworksList } from "#controllers/Network.controller";

const networkRoute = express.Router();

networkRoute.route("/addNetwork").post(addNetwork);
networkRoute.route("/getAddedNetworksList/:walletId").get(getAddedNetworksList);

export default networkRoute;