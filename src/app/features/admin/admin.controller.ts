import { inject } from 'inversify';
import { BaseHttpController, controller, httpDelete, httpPost, httpPut, interfaces, requestBody, requestParam } from 'inversify-express-utils';
import { validate } from '../../shared/decorators/validate.decorator';
import { AdminService } from './interfaces';
import { AdminToSaveDTO } from './admin-to-save.dto';
import { TYPES } from '../../core/containers/types';
import { permission } from '../../shared/decorators/permission.decorator';
import createHttpError from 'http-errors';
@controller('/admin')
export class AdminController extends BaseHttpController {

  @inject(TYPES.CONTAINER_DEFAULT_ADMIN_SERVICE) private readonly service: AdminService;

  /**
   * Create a admin.
   *
   * @route POST /admin
   * @group Admin
   * @param {AdminToSave.model} admin.body - Admin payload.
   * @returns {Admin.model} 200 - Created admin.
   * @returns {HttpError.model} 409 - Admin already exists.
   * @returns {HttpError.model} 422 - Admin payload invalid.
   */
  @permission('admin')
  @validate(AdminToSaveDTO)
  @httpPost('')
  public async create(@requestBody() admin: AdminToSaveDTO): Promise<interfaces.IHttpActionResult> {
    try {
      const exists = await this.service.exists({ email: admin.email });
      if (exists) {
        throw createHttpError(409, `Admin email ${admin.email} already exists`);
      }
      return this.ok(await this.service.save(admin));
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update the specified admin. In the admin update payload the UUID will be ignored and will consider only the request param.
   *
   * @route PUT /admin/:uuid
   * @group Admin
   * @param {string} uuid.param - Admin UUID.
   * @param {AdminToSave.model} admin.body - Admin payload.
   * @returns {Admin.model} 200 - Modified Admin.
   * @returns {HttpError.model} 404 - Admin not found.
   * @returns {HttpError.model} 422 - Admin payload invalid.
   */
  @validate(AdminToSaveDTO)
  @httpPut('/:uuid')
  public async update(@requestParam('uuid') uuid: string, @requestBody() admin: AdminToSaveDTO): Promise<interfaces.IHttpActionResult> {
    try {
      const exists = await this.service.exists({ uuid });
      if (!exists) {
        throw createHttpError(404, 'Admin not found');
      }
      return this.ok(await this.service.save(admin, uuid));
    } catch (error) {
      throw error;
    }
  }

  /**
   * Perform an soft delete in the specified admin. In the admin update payload the UUID will be ignored and will consider only the request param.
   *
   * @route DELETE /admin/:uuid
   * @group Admin
   * @param {string} uuid.param - Admin UUID.
   * @param {Admin.model} admin.body - Admin payload.
   * @returns {Admin.model} 200 - Deleted Admin.
   * @returns {HttpError.model} 404 - Admin not found.
   * @returns {HttpError.model} 409 - Admin already deleted.
   */
  @httpDelete('/:uuid')
  public async delete(@requestParam('uuid') uuid: string): Promise<interfaces.IHttpActionResult> {
    try {
      const exists = await this.service.exists({ uuid }, true);
      if (!exists) {
        throw createHttpError(404, 'Admin not found');
      }
      return this.ok(await this.service.delete(uuid));
    } catch (error) {
      throw error;
    }
  }
}