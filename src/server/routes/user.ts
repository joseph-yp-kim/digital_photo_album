import * as express from 'express';
import userModel from '../database/models/user';
import { userService } from '../services/';
import type { RequestHandler } from 'express';

export class UserController {
  private router: express.Router;

  constructor() {
    this.router = express.Router();
    this.router.route('/').get(this.getAll);
  }

  public initRoutes(apiRouter: express.Router) {
    apiRouter.use('/users', this.router);
  }

  protected getAll: RequestHandler = async (req, res, next) => {
    const users = await userService.getUsers();
    return res.json({ users });
  };
}
