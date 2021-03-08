import { ContainerModule } from 'inversify';
import { AdminService } from './interfaces';
import { DefaultAdminService } from './default-admin.service';
import { TYPES } from '../../core/containers/types';

const AdminContainerModule: ContainerModule = new ContainerModule((bind) => {
  bind<AdminService>(TYPES.CONTAINER_DEFAULT_ADMIN_SERVICE).to(DefaultAdminService);
});

export { AdminContainerModule };