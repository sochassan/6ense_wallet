import express from "express";
import { sendToken } from "#controllers/Transaction.controller";

const transactionRoute = express.Router();

transactionRoute.route("/sendToken").post(sendToken);

export default transactionRoute;
