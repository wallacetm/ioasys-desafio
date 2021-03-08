import { interfaces } from 'inversify-express-utils';
import { PersonEntity } from '../../shared/person/person.entity';
import { PersonToSaveDTO } from '../../shared/person/person-to-save.dto';

export interface UserPrincipal extends interfaces.Principal {
  details: Pick<PersonEntity, 'uuid' | 'email' | 'firstName' | 'lastName'>,
  token?: string;
  isResourceOwner(resrouceEntity: { createdBy: string }): Promise<boolean>;
}

export interface AuthService {
  getUser(token: string): Promise<UserPrincipal>;
  signInUser(user: Pick<PersonToSaveDTO, 'email' | 'password'>): Promise<string>;
}

export interface CryptoService {
  encrypt(value: string, salt: string): Promise<string>;
  compare(hash: string, value: string): Promise<boolean>;
}