import { FindOneOptions, FindManyOptions, DeleteResult } from 'typeorm';

import { CreateUserSessionDto } from '../dto/create-user-session.dto';
import { UpdateUserSessionDto } from '../dto/update-user-session.dto';
import { UserSessionEntity } from '../entities/user-session.entity';

/**
 * A service contract which must be implemented by [UserSessionService]{@link UserSessionService}.
 */
export interface UserSessionServiceInterface {
	/**
	 * Returns a list of all the records of user session.
	 */
	getAll(): Promise<UserSessionEntity[]>;

	/**
	 * Returns a single record of user session based on the given session id.
	 * @param {number} id - a unique id / primary key.
	 */
	getOneById(id: number): Promise<UserSessionEntity>;

	/**
	 * Returns a single record of user session based on the given conditions.
	 * @param {FindOneOptions} condition - Condition to apply in query.
	 */
	getOneByCondition(
		condition: FindOneOptions<any>
	): Promise<UserSessionEntity>;

	/**
	 * Returns a list of records of user session based on the given conditions.
	 * @param {FindManyOptions} condition - Condition to apply in query.
	 */
	getManyByCondition(
		condition: FindManyOptions<any>
	): Promise<UserSessionEntity[]>;

	/**
	 * Create record(s).
	 * @param {CreateUserSessionDto} data - Data which need to be inserted in database table.
	 */
	create(data: CreateUserSessionDto): Promise<UserSessionEntity>;

	/**
	 * Update record(s).
	 * @param {number} id - Primary key of the table.
	 * @param {UpdateUserSessionDto} data - Data which need to be updated in database table.
	 */
	update(id: number, data: UpdateUserSessionDto): Promise<UserSessionEntity>;

	/**
	 * Create / update user session.
	 * @param {CreateUserSessionDto | UpdateUserSessionDto} data - Data which need to be stored in database table.
	 */
	saveChanges(
		data: CreateUserSessionDto | UpdateUserSessionDto
	): Promise<UserSessionEntity>;

	/**
	 * Delete user session based on the given session id.
	 * @param {number} id - a unique id / primary key.
	 */
	delete(id: number): Promise<DeleteResult>;
}
