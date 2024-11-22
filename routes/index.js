import error from "#middlewares/error";
import walletRoute from "#routes/wallet.routes";
import accountRoute from "#routes/account.routes";
import generalRoute from "#routes/general.routes";
import networkRoute from "#routes/network.routes";
import transactionRoute from "#routes/transaction.routes";


const routes = (app) => {

  // app.get("*", (req, res) => {
  //   res.send("404 Page Not Found!")
  // })

  app.use(error);

  app.use("/api", walletRoute);
  app.use("/api", generalRoute);
  app.use("/api", accountRoute);
  app.use("/api", networkRoute);
  app.use("/api", transactionRoute);

};
export default routes;
