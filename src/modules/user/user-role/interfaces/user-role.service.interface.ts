import { FindOneOptions, FindManyOptions, DeleteResult } from 'typeorm';

import { UserRoleDto } from '../dto/user-role.dto';
import { UserRoleEntity } from '../entities/user-role.entity';

/**
 * A service contract which must be implemented by [UserRoleService]{@link UserRoleService}.
 */
export interface UserRoleServiceInterface {
	/**
	 * Returns a list of all the records of user role.
	 */
	getAll(): Promise<UserRoleEntity[]>;

	/**
	 * Returns a single record of user role based on the given user role id.
	 * @param {number} id - a unique id / primary key.
	 */
	getOneById(id: number): Promise<UserRoleEntity>;

	/**
	 * Returns a single record of user role based on the given conditions.
	 * @param {FindOneOptions} condition - Condition to apply in query.
	 */
	getOneByCondition(condition: FindOneOptions<any>): Promise<UserRoleEntity>;

	/**
	 * Returns a list of records of user role based on the given conditions.
	 * @param {FindManyOptions} condition - Condition to apply in query.
	 */
	getManyByCondition(
		condition: FindManyOptions<any>
	): Promise<UserRoleEntity[]>;

	/**
	 * Create record(s).
	 * @param {UserRoleDto} data - Data which need to be inserted in database table.
	 */
	create(data: UserRoleDto): Promise<UserRoleEntity>;

	/**
	 * Update record(s).
	 * @param {number} id - Primary key of the table.
	 * @param {UserRoleDto} data - Data which need to be updated in database table.
	 */
	update(id: number, data: UserRoleDto): Promise<UserRoleEntity>;

	/**
	 * Create / update user.
	 * @param {UserRoleDto} data - Data which need to be stored in database table.
	 */
	saveChanges(data: UserRoleDto): Promise<UserRoleEntity>;

	/**
	 * Delete user based on the given user role id.
	 * @param {number} id - a unique id / primary key.
	 */
	delete(id: number): Promise<DeleteResult>;
}
