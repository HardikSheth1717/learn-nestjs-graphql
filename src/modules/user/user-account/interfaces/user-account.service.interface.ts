import { FindOneOptions, FindManyOptions, DeleteResult } from 'typeorm';

import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserAccountEntity } from '../entities/user-account.entity';

/**
 * A service contract which must be implemented by [UserAccountService]{@link UserAccountService}.
 */
export interface UserAccountServiceInterface {
	/**
	 * Returns a list of all the records of user.
	 */
	getAll(): Promise<UserAccountEntity[]>;

	/**
	 * Returns a single record of user based on the given user id.
	 * @param {number} id - a unique id / primary key.
	 */
	getOneById(id: number): Promise<UserAccountEntity>;

	/**
	 * Returns a single record of user based on the given conditions.
	 * @param {FindOneOptions} condition - Condition to apply in query.
	 */
	getOneByCondition(
		condition: FindOneOptions<any>
	): Promise<UserAccountEntity>;

	/**
	 * Returns a list of records of user based on the given conditions.
	 * @param {FindManyOptions} condition - Condition to apply in query.
	 */
	getManyByCondition(
		condition: FindManyOptions<any>
	): Promise<UserAccountEntity[]>;

	/**
	 * Create record(s).
	 * @param {CreateUserDto} data - Data which need to be inserted in database table.
	 */
	create(data: CreateUserDto): Promise<UserAccountEntity>;

	/**
	 * Update record(s).
	 * @param {number} id - Primary key of the table.
	 * @param {UpdateUserDto} data - Data which need to be updated in database table.
	 */
	update(id: number, data: UpdateUserDto): Promise<UserAccountEntity>;

	/**
	 * Create / update user.
	 * @param {CreateUserDto | UpdateUserDto} data - Data which need to be stored in database table.
	 */
	saveChanges(
		data: CreateUserDto | UpdateUserDto
	): Promise<UserAccountEntity>;

	/**
	 * Delete user based on the given user id.
	 * @param {number} id - a unique id / primary key.
	 */
	delete(id: number): Promise<DeleteResult>;
}
