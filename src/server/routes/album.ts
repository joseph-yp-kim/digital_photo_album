import * as express from 'express';
import { albumService } from '../services/';
import type { RequestHandler } from 'express';

export class AlbumController {
  private router: express.Router;

  constructor() {
    this.router = express.Router();
    this.router.route('/').get(this.getAll);
  }

  public initRoutes(apiRouter: express.Router) {
    apiRouter.use('/albums', this.router);
  }

  protected getAll: RequestHandler = async (req, res, next) => {
    const albumsQueryParams = req.query;
    const albums = await albumService.getAlbumsByQuery(albumsQueryParams);
    return res.json({ albums });
  };
}
