import { BaseRepositoryInterface } from '@base/interfaces/base.repository.interface';
import { RoleEntity } from '../entities/role.entity';

/**
 * A contract for [RoleRepository]{@link RoleRepository} class.
 */
export type RoleRepositoryInterface = BaseRepositoryInterface<RoleEntity>;
