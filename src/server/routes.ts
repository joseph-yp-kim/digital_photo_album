import * as express from "express";
import { UserController } from "./routes/user";

export default function routes(app: express.Application) {
  const router = express.Router();
  app.use("/api", router);

  router.get("/hello", (req, res, next) => {
    res.json("World");
  });

  let controllers = [new UserController()];

  controllers.forEach(function (ctrl) {
    ctrl.initRoutes(router);
  });
}
