import { ContainerModule } from 'inversify';
import { AuthService, UserPrincipal, CryptoService } from './interfaces';
import { JWTAuthService } from './jwt-auth.service';
import { BCryptCryptoService } from './bcrypt-crypto.service';
import { BaseMiddleware } from 'inversify-express-utils';
import { OptionalAuthMiddleware, RequiredAuthMiddleware } from './auth.middlewares';
import { TYPES } from '../containers/types';

const AuthContainerModule: ContainerModule = new ContainerModule((bind) => {
  bind<AuthService>(TYPES.CONTAINER_JWT_AUTH_SERVICE).to(JWTAuthService);
  bind<CryptoService>(TYPES.CONTAINER_BCRYPT_CRYPTO_SERVICE).to(BCryptCryptoService).inSingletonScope();
  bind<BaseMiddleware>(TYPES.CONTAINER_REQUIRED_AUTH_MIDDLEWARE).to(RequiredAuthMiddleware);
  bind<BaseMiddleware>(TYPES.CONTAINER_OPTIONAL_AUTH_MIDDLEWARE).to(OptionalAuthMiddleware);
  bind<UserPrincipal>(TYPES.SCOPED_USER_PRINCIPAL).toConstantValue(undefined);
});

export { AuthContainerModule };