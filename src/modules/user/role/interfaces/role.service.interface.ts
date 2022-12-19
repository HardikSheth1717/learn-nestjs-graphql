import { FindOneOptions, FindManyOptions, DeleteResult } from 'typeorm';

import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { RoleEntity } from '../entities/role.entity';

/**
 * A service contract which must be implemented by [RoleService]{@link RoleService}.
 */
export interface RoleServiceInterface {
	/**
	 * Returns a list of all the records of role.
	 */
	getAll(): Promise<RoleEntity[]>;

	/**
	 * Returns a single record of role based on the given role id.
	 * @param {number} id - a unique id / primary key.
	 */
	getOneById(id: number): Promise<RoleEntity>;

	/**
	 * Returns a single record of role based on the given conditions.
	 * @param {FindOneOptions} condition - Condition to apply in query.
	 */
	getOneByCondition(condition: FindOneOptions<any>): Promise<RoleEntity>;

	/**
	 * Returns a list of records of role based on the given conditions.
	 * @param {FindManyOptions} condition - Condition to apply in query.
	 */
	getManyByCondition(condition: FindManyOptions<any>): Promise<RoleEntity[]>;

	/**
	 * Create record(s).
	 * @param {CreateRoleDto} data - Data which need to be inserted in database table.
	 */
	create(data: CreateRoleDto): Promise<RoleEntity>;

	/**
	 * Update record(s).
	 * @param {number} id - Primary key of the table.
	 * @param {UpdateRoleDto} data - Data which need to be updated in database table.
	 */
	update(id: number, data: UpdateRoleDto): Promise<RoleEntity>;

	/**
	 * Create / update role.
	 * @param {CreateRoleDto | UpdateRoleDto} data - Data which need to be stored in database table.
	 */
	saveChanges(data: CreateRoleDto | UpdateRoleDto): Promise<RoleEntity>;

	/**
	 * Delete role based on the given role id.
	 * @param {number} id - a unique id / primary key.
	 */
	delete(id: number): Promise<DeleteResult>;
}
