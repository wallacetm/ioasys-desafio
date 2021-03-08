import { AdminDTO } from './admin.dto';
import { AdminToSaveDTO } from './admin-to-save.dto';
import { PersonToSaveDTO } from '../../shared/person/person-to-save.dto';

export interface AdminService {
  exists(user: Partial<Pick<AdminDTO, 'email' | 'uuid'>>, deleted?: boolean): Promise<AdminDTO>;
  getAndValidatePassword(user: Pick<PersonToSaveDTO, 'email' | 'password'>): Promise<AdminDTO>;
  save(user: AdminToSaveDTO, uuid?: string): Promise<AdminDTO>;
  delete(userId: string): Promise<AdminDTO>;
}