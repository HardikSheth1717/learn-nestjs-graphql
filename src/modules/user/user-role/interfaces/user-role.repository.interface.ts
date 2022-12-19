import { BaseRepositoryInterface } from '@base/interfaces/base.repository.interface';
import { UserRoleEntity } from '../entities/user-role.entity';

/**
 * A contract for [UserRoleRepository]{@link UserRoleRepository} class.
 */
export type UserRoleRepositoryInterface =
	BaseRepositoryInterface<UserRoleEntity>;
