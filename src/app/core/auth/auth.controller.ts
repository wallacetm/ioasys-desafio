import { inject } from 'inversify';
import { BaseHttpController, controller, httpPost, interfaces, requestBody } from 'inversify-express-utils';
import { AuthService } from './interfaces';
import { PersonToSaveDTO } from '../../shared/person/person-to-save.dto';
import { TYPES } from '../containers/types';
@controller('/auth')
export class AuthController extends BaseHttpController {

  @inject(TYPES.CONTAINER_JWT_AUTH_SERVICE) private readonly authService: AuthService;

  /**
   * Login in application with email and passwords. Returns an json with tokenType and token.
   *
   * @route POST /auth/login
   * @group Auth
   * @param {LoginInput.model} user.body - User login payload.
   * @returns {LoginOutput.model} 200 - User logged result with token and tokenType.
   * @returns {HttpError.model} 401 - User not found.
   */
  @httpPost('/login')
  public login(@requestBody() body: Pick<PersonToSaveDTO, 'email' | 'password'>): Promise<interfaces.IHttpActionResult> {
    return this.authService
      .signInUser(body)
      .then(token => this.ok(token));
  }
}