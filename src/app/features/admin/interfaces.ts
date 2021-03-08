import { AdminDTO } from './admin.dto';
import { AdminToSaveDTO } from './admin-to-save.dto';
import { PersonToSaveDTO } from '../../shared/person/person-to-save.dto';

export interface AdminService {
  exists(admin: Partial<Pick<AdminDTO, 'email' | 'uuid'>>, deleted?: boolean): Promise<boolean>;
  getAndValidatePassword(admin: Pick<PersonToSaveDTO, 'email' | 'password'>): Promise<AdminDTO>;
  save(admin: AdminToSaveDTO, uuid?: string): Promise<AdminDTO>;
  delete(adminId: string): Promise<AdminDTO>;
}