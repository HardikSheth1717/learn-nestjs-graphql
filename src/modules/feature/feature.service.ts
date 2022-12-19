import { Injectable, Inject } from '@nestjs/common';

import { FindOneOptions, FindManyOptions, DeleteResult } from 'typeorm';

import { DIToken } from '@core/enums/ditoken.enum';

import { FeatureRepositoryInterface } from './interfaces/feature.repository.interface';
import { FeatureServiceInterface } from './interfaces/feature.service.interface';

import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';
import { FeatureEntity } from './entities/feature.entity';

/**
 * A service / provider for feature master.
 */
@Injectable()
export class FeatureService implements FeatureServiceInterface {
	constructor(
		@Inject(DIToken.FEATURE_REPOSITORY_INTERFACE)
		private readonly featureRepository: FeatureRepositoryInterface
	) {}

	/**
	 * Returns a list of all the records of feature.
	 */
	getAll(): Promise<FeatureEntity[]> {
		try {
			return this.featureRepository.getAll();
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Returns a single record of feature based on the given feature id.
	 * @param {number} id - a unique id / primary key.
	 */
	getOneById(id: number): Promise<FeatureEntity> {
		try {
			return this.featureRepository.getOneById({
				where: {
					featureId: id
				}
			});
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Returns a single record of feature based on the given conditions.
	 * @param {FindOneOptions} condition - Condition to apply in query.
	 */
	getOneByCondition(condition: FindOneOptions<any>): Promise<FeatureEntity> {
		try {
			return this.featureRepository.getOneByCondition(condition);
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Returns a list of records of feature based on the given conditions.
	 * @param {FindManyOptions} condition - Condition to apply in query.
	 */
	getManyByCondition(
		condition: FindManyOptions<any>
	): Promise<FeatureEntity[]> {
		try {
			return this.featureRepository.getManyByCondition(condition);
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Create record(s).
	 * @param {CreateFeatureDto} data - Data which need to be inserted in database table.
	 */
	create(data: CreateFeatureDto): Promise<FeatureEntity> {
		try {
			return this.featureRepository.create(data);
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Update record(s).
	 * @param {number} id - Primary key of the table.
	 * @param {UpdateFeatureDto} data - Data which need to be updated in database table.
	 */
	update(id: number, data: UpdateFeatureDto): Promise<FeatureEntity> {
		try {
			return this.featureRepository.update(id, data);
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Create / update feature.
	 * @param {CreateFeatureDto | UpdateFeatureDto} data - Data which need to be stored in database table.
	 */
	saveChanges(
		data: CreateFeatureDto | UpdateFeatureDto
	): Promise<FeatureEntity> {
		try {
			return this.featureRepository.saveChanges(data);
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Delete feature based on the given feature id.
	 * @param {number} id - a unique id / primary key.
	 */
	delete(id: number): Promise<DeleteResult> {
		try {
			return this.featureRepository.delete(id);
		} catch (error) {
			throw error;
		}
	}
}
