import { BaseHttpController, controller, httpGet, interfaces } from "inversify-express-utils";

@controller('/ping')
export class PingController extends BaseHttpController {
  @httpGet('')
  public async getAll(): Promise<interfaces.IHttpActionResult> {
    return this.ok();
  }
}