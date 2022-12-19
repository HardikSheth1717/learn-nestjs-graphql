import { BaseRepositoryInterface } from '@base/interfaces/base.repository.interface';
import { UserSessionEntity } from '../entities/user-session.entity';

/**
 * A contract for [UserSessionRepository]{@link UserSessionRepository} class.
 */
export type UserSessionRepositoryInterface =
	BaseRepositoryInterface<UserSessionEntity>;
