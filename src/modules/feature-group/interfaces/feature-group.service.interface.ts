import { FindOneOptions, FindManyOptions, DeleteResult } from 'typeorm';

import { CreateFeatureGroupDto } from '../dto/create-feature-group.dto';
import { UpdateFeatureGroupDto } from '../dto/update-feature-group.dto';
import { FeatureGroupEntity } from '../entities/feature-group.entity';

/**
 * A service contract which must be implemented by [FeatureGroupService]{@link FeatureGroupService}.
 */
export interface FeatureGroupServiceInterface {
	/**
	 * Returns a list of all the records of feature group.
	 */
	getAll(): Promise<FeatureGroupEntity[]>;

	/**
	 * Returns a single record of feature group based on the given feature group id.
	 * @param {number} id - a unique id / primary key.
	 */
	getOneById(id: number): Promise<FeatureGroupEntity>;

	/**
	 * Returns a single record of feature group based on the given conditions.
	 * @param {FindOneOptions} condition - Condition to apply in query.
	 */
	getOneByCondition(
		condition: FindOneOptions<any>
	): Promise<FeatureGroupEntity>;

	/**
	 * Returns a list of records of feature group based on the given conditions.
	 * @param {FindManyOptions} condition - Condition to apply in query.
	 */
	getManyByCondition(
		condition: FindManyOptions<any>
	): Promise<FeatureGroupEntity[]>;

	/**
	 * Create record(s).
	 * @param {CreateFeatureGroupDto} data - Data which need to be inserted in database table.
	 */
	create(data: CreateFeatureGroupDto): Promise<FeatureGroupEntity>;

	/**
	 * Update record(s).
	 * @param {number} id - Primary key of the table.
	 * @param {UpdateFeatureGroupDto} data - Data which need to be updated in database table.
	 */
	update(
		id: number,
		data: UpdateFeatureGroupDto
	): Promise<FeatureGroupEntity>;

	/**
	 * Create / update feature group.
	 * @param {CreateFeatureGroupDto | UpdateFeatureGroupDto} data - Data which need to be stored in database table.
	 */
	saveChanges(
		data: CreateFeatureGroupDto | UpdateFeatureGroupDto
	): Promise<FeatureGroupEntity>;

	/**
	 * Delete feature group based on the given feature group id.
	 * @param {number} id - a unique id / primary key.
	 */
	delete(id: number): Promise<DeleteResult>;
}
