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

@injectable()
export class JWTAuthService implements AuthService {

  @inject(TYPES.CONTAINER_MAP_CONFIG_SERVICE) private readonly config: ConfigService;
  @inject(TYPES.CONTAINER_DEFAULT_USER_SERVICE) private readonly userService: UserService;

  async getUser(token: string): Promise<UserPrincipal> {
    const user = jwt.verify(token, this.config.get(CONFIG_AUTH_SECRET));
    if (typeof user === 'string') {
      throw createError(401, 'Invalid json web token');
    }
    const userPrincipal = new JWTUserPrincipal({ ...user, token, roles: ['admin'] });
    return userPrincipal;
  }
  async signInUser(user: Pick<PersonToSaveDTO, 'email' | 'password'>): Promise<string> {
    const valid = await this.userService.validatePassword(user);
    if (!valid) {
      throw createError(401, 'Invalid user email and password');
    }
    const token = jwt.sign(user, this.config.get(CONFIG_AUTH_SECRET));
    return token;
  }
}