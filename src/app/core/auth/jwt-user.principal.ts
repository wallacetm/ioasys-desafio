import { UserPrincipal } from './interfaces';
import { PersonEntity } from '../../shared/person/person.entity';

export class JWTUserPrincipal implements UserPrincipal {
  public readonly details: Pick<PersonEntity, 'uuid' | 'email' | 'firstName' | 'lastName'>;
  public readonly token?: string;
  public readonly roles: string[];

  constructor(partial: Partial<JWTUserPrincipal>) {
    Object.assign(this, partial);
  }

  isAuthenticated(): Promise<boolean> {
    return Promise.resolve(!!this.token && !!this.details);
  }
  isResourceOwner(resourceEntity: { createdBy: string }): Promise<boolean> {
    return Promise.resolve(this.details.uuid === resourceEntity.createdBy);
  }
  isInRole(role: string): Promise<boolean> {
    return Promise.resolve(this.roles.includes(role));
  }
}