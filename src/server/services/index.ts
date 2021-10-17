import { AlbumDao } from '../database/daos/AlbumDao';
import { UserDao } from '../database/daos/UserDao';
import { AlbumService } from './AlbumService';
import { UserService } from './UserService';

const albumDao = new AlbumDao();
const userDao = new UserDao();

const albumService = new AlbumService();
const userService = new UserService();
albumService.initialize({ albumDao });
userService.initialize({ userDao });

export { albumService, userService };
