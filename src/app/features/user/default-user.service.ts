import { inject, injectable } from 'inversify';
import { Connection, Repository } from 'typeorm';
import { UserService } from './interfaces';
import { UserDTO } from './user.dto';
import { UserEntity } from './user.entity';
import { UserToSaveDTO } from './user-to-save.dto';
import { UserPrincipal, CryptoService } from '../../core/auth/interfaces';
import { PersonToSaveDTO } from '../../shared/person/person-to-save.dto';
import * as createHttpError from 'http-errors';
import { v4 as uuidv4 } from 'uuid';
import { TYPES } from '../../core/containers/types';
import { LoggerService } from '../../core/logger/interfaces';

@injectable()
export class DefaultUserService implements UserService {

  @inject(TYPES.CONTAINER_DATABASE_CONNECTION) connection: Connection;
  @inject(TYPES.SCOPED_USER_PRINCIPAL) private readonly user: UserPrincipal;
  @inject(TYPES.CONTAINER_BCRYPT_CRYPTO_SERVICE) private readonly crypto: CryptoService;
  @inject(TYPES.CONTAINER_CONSOLE_LOGGER_SERVICE) private readonly logger: LoggerService;

  get repository(): Repository<UserEntity> {
    return this.connection.getRepository(UserEntity);
  }

  async exists(user: Partial<Pick<UserDTO, 'email' | 'uuid'>>, deleted = false): Promise<boolean> {
    try {
      const entity = await this.repository.findOne({
        where: [{ email: user.email }, { uuid: user.uuid }],
        withDeleted: deleted
      });
      return !!entity;
    } catch (error) { }
    return false;
  }

  async getAndValidatePassword(user: Pick<PersonToSaveDTO, 'email' | 'password'>): Promise<UserDTO> {
    try {
      const entity = await this.repository.findOne({ where: { email: user.email } });
      const equals = await this.crypto.compare(user.password, entity.password);
      if (equals) {
        return entity.toDTO();
      }
    } catch (error) {
      this.logger.error(`Error checking user ${user.email} password`, error);
    }
    return null;
  }

  async save(user: UserToSaveDTO, uuid?: string): Promise<UserDTO> {
    const repository = this.repository;
    let entity: UserEntity = null;
    const entityUpdate = user.toEntity();
    if (uuid) {
      try {
        entity = await repository.findOne(uuid);
        entity = new UserEntity({ ...entity, ...entityUpdate });
      } catch (error) {
        throw createHttpError(404, { ...error, message: `Could not find user with uuid: ${uuid}` });
      }
    } else {
      entity = entityUpdate;
      entity.createdBy = this.user.details.uuid;
      entity.uuid = uuidv4();
    }
    entity.password = await this.crypto.encrypt(entityUpdate.password);
    entity.updatedBy = this.user.details.uuid;
    return repository.save(entity).then(entity => entity.toDTO());
  }

  async delete(userId: string): Promise<UserDTO> {
    const entity = await this.repository.findOne(userId);
    if (!entity) {
      throw createHttpError(409, 'User already deleted');
    }
    const deletedEntity = this.connection.transaction(async manager => {
      const repository = manager.getRepository(UserEntity);
      await repository.update(entity.uuid, { deletedBy: this.user.details.uuid });
      return repository.softRemove(entity);
    })
    return deletedEntity.then(entity => entity.toDTO());
  }

}