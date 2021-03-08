import { BaseHttpController, controller, httpGet, interfaces } from 'inversify-express-utils';

@controller('/ping')
export class PingController extends BaseHttpController {

  /**
   * Ping to server to secure it is running
   *
   * @route GET /ping
   * @group Ping
   * @returns {string} 200 - OK
   */
  @httpGet('')
  public async getAll(): Promise<interfaces.IHttpActionResult> {
    return this.ok();
  }
}