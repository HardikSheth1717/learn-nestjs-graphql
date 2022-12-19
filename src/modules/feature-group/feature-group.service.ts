import { Injectable, Inject } from '@nestjs/common';

import { FindOneOptions, FindManyOptions, DeleteResult } from 'typeorm';

import { DIToken } from '@core/enums/ditoken.enum';

import { FeatureGroupRepositoryInterface } from './interfaces/feature-group.repository.interface';
import { FeatureGroupServiceInterface } from './interfaces/feature-group.service.interface';

import { CreateFeatureGroupDto } from './dto/create-feature-group.dto';
import { UpdateFeatureGroupDto } from './dto/update-feature-group.dto';
import { FeatureGroupEntity } from './entities/feature-group.entity';

/**
 * A service / provider for featureGroup master.
 */
@Injectable()
export class FeatureGroupService implements FeatureGroupServiceInterface {
	constructor(
		@Inject(DIToken.FEATURE_GROUP_REPOSITORY_INTERFACE)
		private readonly featureGroupRepository: FeatureGroupRepositoryInterface
	) {}

	/**
	 * Returns a list of all the records of featureGroup.
	 */
	getAll(): Promise<FeatureGroupEntity[]> {
		try {
			return this.featureGroupRepository.getAll();
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Returns a single record of featureGroup based on the given featureGroup id.
	 * @param {number} id - a unique id / primary key.
	 */
	getOneById(id: number): Promise<FeatureGroupEntity> {
		try {
			return this.featureGroupRepository.getOneById({
				where: {
					featureGroupId: id
				}
			});
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Returns a single record of featureGroup based on the given conditions.
	 * @param {FindOneOptions} condition - Condition to apply in query.
	 */
	getOneByCondition(
		condition: FindOneOptions<any>
	): Promise<FeatureGroupEntity> {
		try {
			return this.featureGroupRepository.getOneByCondition(condition);
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Returns a list of records of featureGroup based on the given conditions.
	 * @param {FindManyOptions} condition - Condition to apply in query.
	 */
	getManyByCondition(
		condition: FindManyOptions<any>
	): Promise<FeatureGroupEntity[]> {
		try {
			return this.featureGroupRepository.getManyByCondition(condition);
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Create record(s).
	 * @param {CreateFeatureGroupDto} data - Data which need to be inserted in database table.
	 */
	create(data: CreateFeatureGroupDto): Promise<FeatureGroupEntity> {
		try {
			return this.featureGroupRepository.create(data);
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Update record(s).
	 * @param {number} id - Primary key of the table.
	 * @param {UpdateFeatureGroupDto} data - Data which need to be updated in database table.
	 */
	update(
		id: number,
		data: UpdateFeatureGroupDto
	): Promise<FeatureGroupEntity> {
		try {
			return this.featureGroupRepository.update(id, data);
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Create / update featureGroup.
	 * @param {CreateFeatureGroupDto | UpdateFeatureGroupDto} data - Data which need to be stored in database table.
	 */
	saveChanges(
		data: CreateFeatureGroupDto | UpdateFeatureGroupDto
	): Promise<FeatureGroupEntity> {
		try {
			return this.featureGroupRepository.saveChanges(data);
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Delete featureGroup based on the given featureGroup id.
	 * @param {number} id - a unique id / primary key.
	 */
	delete(id: number): Promise<DeleteResult> {
		try {
			return this.featureGroupRepository.delete(id);
		} catch (error) {
			throw error;
		}
	}
}
