import { inject } from 'inversify';
import { BaseHttpController, controller, httpDelete, httpPost, httpPut, interfaces, requestBody, requestParam } from 'inversify-express-utils';
import { validate } from '../../shared/decorators/validate.decorator';
import { UserService } from './interfaces';
import { UserToSaveDTO } from './user-to-save.dto';
import { TYPES } from '../../core/containers/types';
import { permission } from '../../shared/decorators/permission.decorator';
import * as createHttpError from 'http-errors';
@controller('/users', TYPES.CONTAINER_REQUIRED_AUTH_MIDDLEWARE)
export class UserController extends BaseHttpController {

  @inject(TYPES.CONTAINER_DEFAULT_USER_SERVICE) private readonly service: UserService;

  /**
   * Create a user.
   *
   * @route POST /users
   * @group User
   * @param {UserToSave.model} user.body - User payload.
   * @returns {User.model} 200 - Created user.
   * @returns {HttpError.model} 409 - User already exists.
   * @returns {HttpError.model} 422 - User payload invalid.
   */
  @permission('admin')
  @validate(UserToSaveDTO)
  @httpPost('')
  public async create(@requestBody() user: UserToSaveDTO): Promise<interfaces.IHttpActionResult> {
    try {
      const exists = await this.service.exists({ email: user.email });
      if (exists) {
        throw createHttpError(409, `User email ${user.email} already exists`);
      }
      return this.ok(await this.service.save(user));
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update the specified user. In the user update payload the UUID will be ignored and will consider only the request param.
   *
   * @route PUT /users/:uuid
   * @group User
   * @param {string} uuid.param - User UUID.
   * @param {UserToSave.model} user.body - User payload.
   * @returns {User.model} 200 - Modified user.
   * @returns {HttpError.model} 404 - User not found.
   * @returns {HttpError.model} 422 - User payload invalid.
   */
  @validate(UserToSaveDTO)
  @httpPut('/:uuid')
  public async update(@requestParam('uuid') uuid: string, @requestBody() user: UserToSaveDTO): Promise<interfaces.IHttpActionResult> {
    try {
      const exists = await this.service.exists({ uuid });
      if (!exists) {
        throw createHttpError(404, 'User not found');
      }
      return this.ok(await this.service.save(user, uuid));
    } catch (error) {
      throw error;
    }
  }

  /**
   * Perform an soft delete in the specified user. In the user update payload the UUID will be ignored and will consider only the request param.
   *
   * @route DELETE /users/:uuid
   * @group User
   * @param {string} uuid.param - User UUID.
   * @param {User.model} user.body - User payload.
   * @returns {User.model} 200 - Deleted user.
   * @returns {HttpError.model} 404 - User not found.
   * @returns {HttpError.model} 409 - User already deleted.
   */
  @httpDelete('/:uuid')
  public async delete(@requestParam('uuid') uuid: string): Promise<interfaces.IHttpActionResult> {
    try {
      const exists = await this.service.exists({ uuid }, true);
      if (!exists) {
        throw createHttpError(404, 'User not found');
      }
      return this.ok(await this.service.delete(uuid));
    } catch (error) {
      throw error;
    }
  }
}