import { FindOneOptions, FindManyOptions, DeleteResult } from 'typeorm';

import { RoleFeatureDto } from '../dto/role-feature.dto';
import { RoleFeatureEntity } from '../entities/role-feature.entity';

/**
 * A service contract which must be implemented by [RoleFeatureService]{@link RoleFeatureService}.
 */
export interface RoleFeatureServiceInterface {
	/**
	 * Returns a list of all the records of role feature.
	 */
	getAll(): Promise<RoleFeatureEntity[]>;

	/**
	 * Returns a single record of role feature based on the given role feature id.
	 * @param {number} id - a unique id / primary key.
	 */
	getOneById(id: number): Promise<RoleFeatureEntity>;

	/**
	 * Returns a single record of role feature based on the given conditions.
	 * @param {FindOneOptions} condition - Condition to apply in query.
	 */
	getOneByCondition(
		condition: FindOneOptions<any>
	): Promise<RoleFeatureEntity>;

	/**
	 * Returns a list of records of role feature based on the given conditions.
	 * @param {FindManyOptions} condition - Condition to apply in query.
	 */
	getManyByCondition(
		condition: FindManyOptions<any>
	): Promise<RoleFeatureEntity[]>;

	/**
	 * Create record(s).
	 * @param {RoleFeatureDto} data - Data which need to be inserted in database table.
	 */
	create(data: RoleFeatureDto): Promise<RoleFeatureEntity>;

	/**
	 * Update record(s).
	 * @param {number} id - Primary key of the table.
	 * @param {RoleFeatureDto} data - Data which need to be updated in database table.
	 */
	update(id: number, data: RoleFeatureDto): Promise<RoleFeatureEntity>;

	/**
	 * Create / update user.
	 * @param {RoleFeatureDto} data - Data which need to be stored in database table.
	 */
	saveChanges(data: RoleFeatureDto): Promise<RoleFeatureEntity>;

	/**
	 * Delete user based on the given role feature id.
	 * @param {number} id - a unique id / primary key.
	 */
	delete(id: number): Promise<DeleteResult>;
}
