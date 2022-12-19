import { BaseRepositoryInterface } from '@base/interfaces/base.repository.interface';
import { UserAccountEntity } from '../entities/user-account.entity';

/**
 * A contract for [UserAccountRepository]{@link UserAccountRepository} class.
 */
export type UserAccountRepositoryInterface =
	BaseRepositoryInterface<UserAccountEntity>;
