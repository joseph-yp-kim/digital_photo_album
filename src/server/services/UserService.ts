import { UserDao } from '../database/daos/UserDao';

export class UserService {
  private userDao: UserDao;

  public initialize(params: { userDao: UserDao }) {
    this.userDao = params.userDao;
  }

  public async getUsers() {
    return this.userDao.getUsers();
  }
}
