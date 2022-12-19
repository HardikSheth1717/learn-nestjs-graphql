import { FindOneOptions, FindManyOptions, DeleteResult } from 'typeorm';

import { CreateFeatureDto } from '../dto/create-feature.dto';
import { UpdateFeatureDto } from '../dto/update-feature.dto';
import { FeatureEntity } from '../entities/feature.entity';

/**
 * A service contract which must be implemented by [FeatureService]{@link FeatureService}.
 */
export interface FeatureServiceInterface {
	/**
	 * Returns a list of all the records of feature.
	 */
	getAll(): Promise<FeatureEntity[]>;

	/**
	 * Returns a single record of feature based on the given feature id.
	 * @param {number} id - a unique id / primary key.
	 */
	getOneById(id: number): Promise<FeatureEntity>;

	/**
	 * Returns a single record of feature based on the given conditions.
	 * @param {FindOneOptions} condition - Condition to apply in query.
	 */
	getOneByCondition(condition: FindOneOptions<any>): Promise<FeatureEntity>;

	/**
	 * Returns a list of records of feature based on the given conditions.
	 * @param {FindManyOptions} condition - Condition to apply in query.
	 */
	getManyByCondition(
		condition: FindManyOptions<any>
	): Promise<FeatureEntity[]>;

	/**
	 * Create record(s).
	 * @param {CreateFeatureDto} data - Data which need to be inserted in database table.
	 */
	create(data: CreateFeatureDto): Promise<FeatureEntity>;

	/**
	 * Update record(s).
	 * @param {number} id - Primary key of the table.
	 * @param {UpdateFeatureDto} data - Data which need to be updated in database table.
	 */
	update(id: number, data: UpdateFeatureDto): Promise<FeatureEntity>;

	/**
	 * Create / update feature.
	 * @param {CreateFeatureDto | UpdateFeatureDto} data - Data which need to be stored in database table.
	 */
	saveChanges(
		data: CreateFeatureDto | UpdateFeatureDto
	): Promise<FeatureEntity>;

	/**
	 * Delete feature based on the given feature id.
	 * @param {number} id - a unique id / primary key.
	 */
	delete(id: number): Promise<DeleteResult>;
}
