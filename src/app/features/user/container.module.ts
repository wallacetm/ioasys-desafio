import { ContainerModule } from 'inversify';
import { UserService } from './interfaces';
import { DefaultUserService } from './default-user.service';
import { TYPES } from '../../core/containers/types';



const UserContainerModule: ContainerModule = new ContainerModule((bind) => {
  bind<UserService>(TYPES.CONTAINER_DEFAULT_USER_SERVICE).to(DefaultUserService);
});

export { UserContainerModule };