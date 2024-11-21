import error from "#middlewares/error";
import walletRoute from "#routes/wallet.routes";


const routes = (app) => {

  app.get("*", (req, res) => {
    res.send("404 Page Not Found!")
  })

  app.use(error);

  app.use("/api", walletRoute);

};
export default routes;
