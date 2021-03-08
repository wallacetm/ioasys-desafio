import { AuthService, UserPrincipal } from './interfaces';
import { inject, injectable } from 'inversify';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '../config/interfaces';
import { CONFIG_AUTH_SECRET } from '../../../constants';
import * as createError from 'http-errors';
import { JWTUserPrincipal } from './jwt-user.principal';
import { PersonToSaveDTO } from '../../shared/person/person-to-save.dto';
import { UserService } from '../../features/user/interfaces';
import { TYPES } from '../containers/types';
import { AdminService } from '../../features/admin/interfaces';

@injectable()
export class JWTAuthService implements AuthService {

  @inject(TYPES.CONTAINER_MAP_CONFIG_SERVICE) private readonly config: ConfigService;
  @inject(TYPES.CONTAINER_DEFAULT_USER_SERVICE) private readonly userService: UserService;
  @inject(TYPES.CONTAINER_DEFAULT_ADMIN_SERVICE) private readonly adminService: AdminService;

  async getUser(token: string): Promise<UserPrincipal> {
    const user = jwt.verify(token, this.config.get(CONFIG_AUTH_SECRET, 'S0m3_S3cR3t'));
    if (typeof user === 'string') {
      throw createError(401, 'Invalid json web token');
    }
    const userPrincipal = new JWTUserPrincipal({ ...user, token });
    return userPrincipal;
  }
  async signInUser(user: Pick<PersonToSaveDTO, 'email' | 'password'>): Promise<string> {
    let userPrincipal: UserPrincipal = null;
    const validAdmin = await this.adminService.getAndValidatePassword(user);
    if (validAdmin) {
      userPrincipal = new JWTUserPrincipal({ details: { ...validAdmin }, roles: ['admin'] });
    }
    const validUser = await this.userService.getAndValidatePassword(user);
    if (validUser) {
      userPrincipal = new JWTUserPrincipal({ details: { ...validUser }, roles: ['user'] });
    }
    if (!userPrincipal) {
      throw createError(401, 'Invalid user email and password');
    }
    const token = jwt.sign({ ...userPrincipal }, this.config.get(CONFIG_AUTH_SECRET, 'S0m3_S3cR3t'));
    return token;
  }
}