import { Injectable, Inject } from '@nestjs/common';

import { FindOneOptions, FindManyOptions, DeleteResult } from 'typeorm';

import { DIToken } from '@core/enums/ditoken.enum';

import { RoleFeatureRepositoryInterface } from './interfaces/role-feature.repository.interface';
import { RoleFeatureServiceInterface } from './interfaces/role-feature.service.interface';

import { RoleFeatureDto } from './dto/role-feature.dto';
import { RoleFeatureEntity } from './entities/role-feature.entity';

/**
 * A service / provider for role feature.
 */
@Injectable()
export class RoleFeatureService implements RoleFeatureServiceInterface {
	constructor(
		@Inject(DIToken.ROLE_FEATURE_REPOSITORY_INTERFACE)
		private readonly roleFeatureRepository: RoleFeatureRepositoryInterface
	) {}

	/**
	 * Returns a list of all the records of role feature.
	 */
	getAll(): Promise<RoleFeatureEntity[]> {
		try {
			return this.roleFeatureRepository.getAll();
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Returns a single record of role feature based on the given role feature id.
	 * @param {number} id - a unique id / primary key.
	 */
	getOneById(id: number): Promise<RoleFeatureEntity> {
		try {
			return this.roleFeatureRepository.getOneById({
				where: {
					roleFeatureId: id
				}
			});
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Returns a single record of role feature based on the given conditions.
	 * @param {FindOneOptions} condition - Condition to apply in query.
	 */
	getOneByCondition(
		condition: FindOneOptions<any>
	): Promise<RoleFeatureEntity> {
		try {
			return this.roleFeatureRepository.getOneByCondition(condition);
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Returns a list of records of role feature based on the given conditions.
	 * @param {FindManyOptions} condition - Condition to apply in query.
	 */
	getManyByCondition(
		condition: FindManyOptions<any>
	): Promise<RoleFeatureEntity[]> {
		try {
			return this.roleFeatureRepository.getManyByCondition(condition);
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Create record(s).
	 * @param {RoleFeatureDto} data - Data which need to be inserted in database table.
	 */
	create(data: RoleFeatureDto): Promise<RoleFeatureEntity> {
		try {
			const roleFeatureEntity: RoleFeatureEntity =
				new RoleFeatureEntity();
			roleFeatureEntity.roleFeatureId = 0;
			(roleFeatureEntity.roleId = data.roleId),
				(roleFeatureEntity.featureId = data.featureId),
				(roleFeatureEntity.canCreate = data.canCreate),
				(roleFeatureEntity.canModify = data.canModify),
				(roleFeatureEntity.canDelete = data.canDelete),
				(roleFeatureEntity.canView = data.canView),
				(roleFeatureEntity.canManage = data.canManage);

			return this.roleFeatureRepository.create(roleFeatureEntity);
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Update record(s).
	 * @param {number} id - Primary key of the table.
	 * @param {RoleFeatureDto} data - Data which need to be updated in database table.
	 */
	update(id: number, data: RoleFeatureDto): Promise<RoleFeatureEntity> {
		try {
			return this.roleFeatureRepository.update(id, data);
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Create / update user.
	 * @param {RoleFeatureDto} data - Data which need to be stored in database table.
	 */
	saveChanges(data: RoleFeatureDto): Promise<RoleFeatureEntity> {
		try {
			return this.roleFeatureRepository.saveChanges(data);
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Delete role feature based on the given role feature id.
	 * @param {number} id - a unique id / primary key.
	 */
	delete(id: number): Promise<DeleteResult> {
		try {
			return this.roleFeatureRepository.delete(id);
		} catch (error) {
			throw error;
		}
	}
}
