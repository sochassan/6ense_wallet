/*****  Packages  *****/
import cors from "cors";
import express from "express";
import winston from "winston";
import BodyParser from "body-parser";
import fs from "fs";
/*****  Modules  *****/
import connectDB from "#config/db";
import logger from "#utils/logger";
import routes from "#routes/index";
import { envConfig } from "#utils/env";
import cookieParser from "cookie-parser";
import { ethers } from "ethers";

envConfig();
connectDB();
logger();

export const app = express();
const PORT = process.env.PORT || 5000;

/*****  Middlewares  *****/
app.use(cors({ origin: true, credentials: true }));

app.use(cookieParser());
app.use(express.json());
app.use(BodyParser.urlencoded({ extended: false }));
app.use("/uploads", express.static("uploads"));

// Example route
app.get("/", (req, res) => {
  res.send("Hello, this is a secure server!");
});

routes(app);

// // const providerBnb = new ethers.providers.JsonRpcProvider("https://bsc-testnet-rpc.publicnode.com");
// const BinanceUrl = process.env.BINANCE_RPC_ADDRESS;
// const providerBnb = new ethers.providers.JsonRpcProvider(BinanceUrl);

// const presaleBNBContract = new ethers.Contract(
//   presaleBNBAddress.address,
//   presaleBNBAbis.abi,
//   providerBnb
// );


app.listen(PORT, () => winston.info(`Server is Listening on port ${PORT}.`));
