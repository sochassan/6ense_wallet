import express from "express";
import { getAddedNetworksList } from "#controllers/Network.controller";

const networkRoute = express.Router();

networkRoute.route("/getAddedNetworksList").post(getAddedNetworksList);

export default networkRoute;