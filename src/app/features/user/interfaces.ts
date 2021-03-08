import { UserDTO } from './user.dto';
import { UserToSaveDTO } from './user-to-save.dto';
import { PersonToSaveDTO } from '../../shared/person/person-to-save.dto';

export interface UserService {
  exists(user: Partial<Pick<UserDTO, 'email' | 'uuid'>>, deleted?: boolean): Promise<UserDTO>;
  getAndValidatePassword(user: Pick<PersonToSaveDTO, 'email' | 'password'>): Promise<UserDTO>;
  save(user: UserToSaveDTO, uuid?: string): Promise<UserDTO>;
  delete(userId: string): Promise<UserDTO>;
}