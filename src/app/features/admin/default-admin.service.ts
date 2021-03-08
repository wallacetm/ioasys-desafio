import { inject, injectable } from 'inversify';
import { Connection, Repository } from 'typeorm';
import { AdminService } from './interfaces';
import { AdminDTO } from './admin.dto';
import { AdminEntity } from './admin.entity';
import { AdminToSaveDTO } from './admin-to-save.dto';
import { UserPrincipal, CryptoService } from '../../core/auth/interfaces';
import { PersonToSaveDTO } from '../../shared/person/person-to-save.dto';
import { LoggerService } from '../../../../dist/src/app/core/logger/interfaces';
import * as createHttpError from 'http-errors';
import { v4 as uuidv4 } from 'uuid';
import { TYPES } from '../../core/containers/types';

@injectable()
export class DefaultAdminService implements AdminService {

  @inject(TYPES.CONTAINER_DATABASE_CONNECTION) connection: Connection;
  @inject(TYPES.SCOPED_USER_PRINCIPAL) private readonly user: UserPrincipal;
  @inject(TYPES.CONTAINER_BCRYPT_CRYPTO_SERVICE) private readonly crypto: CryptoService;
  @inject(TYPES.CONTAINER_CONSOLE_LOGGER_SERVICE) private readonly logger: LoggerService;

  get repository(): Repository<AdminEntity> {
    return this.connection.getRepository(AdminEntity);
  }

  async exists(admin: Partial<Pick<AdminDTO, 'email' | 'uuid'>>, deleted = false): Promise<boolean> {
    try {
      const entity = await this.repository.findOne({
        where: [{ email: admin.email }, { uuid: admin.uuid }],
        withDeleted: deleted
      });
      return !!entity;
    } catch (error) { }
    return false;
  }

  async getAndValidatePassword(admin: Pick<PersonToSaveDTO, 'email' | 'password'>): Promise<AdminDTO> {
    try {
      const entity = await this.repository.findOne({ where: { email: admin.email } });
      const equals = await this.crypto.compare(entity.password, admin.password);
      if (equals) {
        return entity.toDTO()
      }
    } catch (error) {
      this.logger.error(`Error checking admin ${admin.email} password`, error);
    }
    return null;
  }

  async save(admin: AdminToSaveDTO, uuid?: string): Promise<AdminDTO> {
    const repository = this.repository;
    let entity: AdminEntity = null;
    const entityUpdate = admin.toEntity();
    if (uuid) {
      try {
        entity = await repository.findOne(uuid);
        entity = new AdminEntity({ ...entity, ...entityUpdate });
      } catch (error) {
        throw createHttpError(404, { ...error, message: `Could not find admin with uuid: ${uuid}` });
      }
    } else {
      entity = entityUpdate;
      entity.createdBy = this.user.details.uuid;
      entity.uuid = uuidv4();
    }
    entity.password = await this.crypto.encrypt(entityUpdate.password, entity.uuid);
    entity.updatedBy = this.user.details.uuid;
    return repository.save(entity).then(entity => entity.toDTO());
  }

  async delete(adminId: string): Promise<AdminDTO> {
    const entity = await this.repository.findOne(adminId);
    if (!entity) {
      throw createHttpError(409, 'Admin already deleted');
    }
    const deletedEntity = this.connection.transaction(async manager => {
      const repository = manager.getRepository(AdminEntity);
      await repository.update(entity.uuid, { deletedBy: this.user.details.uuid });
      return repository.softRemove(entity);
    })
    return deletedEntity.then(entity => entity.toDTO());
  }

}