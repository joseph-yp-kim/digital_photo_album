import * as express from "express";
import albumModel from "../database/models/album";
import type { RequestHandler } from "express";

export class AlbumController {
  private router: express.Router;

  constructor() {
    this.router = express.Router();
    this.router.route("/").get(this.getAll);
  }

  public initRoutes(apiRouter: express.Router) {
    apiRouter.use("/album", this.router);
  }

  protected getAll: RequestHandler = async (req, res, next) => {
    const albums = await albumModel.find({});
    return res.json({ albums });
  };
}
