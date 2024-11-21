

import express from "express";
import { getNativeCurrencyPrice } from "#controllers/General_Functions.controller";

const generalRoute = express.Router();

generalRoute.route("/getNativeCurrencyPrice").post(getNativeCurrencyPrice);

export default generalRoute;