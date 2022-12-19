import { Injectable, Inject } from '@nestjs/common';

import { FindOneOptions, FindManyOptions, DeleteResult } from 'typeorm';

import { DIToken } from '@core/enums/ditoken.enum';

import { RoleRepositoryInterface } from './interfaces/role.repository.interface';
import { RoleServiceInterface } from './interfaces/role.service.interface';

import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleEntity } from './entities/role.entity';

/**
 * A service / provider for role master.
 */
@Injectable()
export class RoleService implements RoleServiceInterface {
	constructor(
		@Inject(DIToken.ROLE_REPOSITORY_INTERFACE)
		private readonly roleRepository: RoleRepositoryInterface
	) {}

	/**
	 * Returns a list of all the records of role.
	 */
	getAll(): Promise<RoleEntity[]> {
		try {
			return this.roleRepository.getAll();
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Returns a single record of role based on the given role id.
	 * @param {number} id - a unique id / primary key.
	 */
	getOneById(id: number): Promise<RoleEntity> {
		try {
			return this.roleRepository.getOneById({
				where: {
					roleId: id
				}
			});
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Returns a single record of role based on the given conditions.
	 * @param {FindOneOptions} condition - Condition to apply in query.
	 */
	getOneByCondition(condition: FindOneOptions<any>): Promise<RoleEntity> {
		try {
			return this.roleRepository.getOneByCondition(condition);
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Returns a list of records of role based on the given conditions.
	 * @param {FindManyOptions} condition - Condition to apply in query.
	 */
	getManyByCondition(condition: FindManyOptions<any>): Promise<RoleEntity[]> {
		try {
			return this.roleRepository.getManyByCondition(condition);
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Create record(s).
	 * @param {CreateRoleDto} data - Data which need to be inserted in database table.
	 */
	create(data: CreateRoleDto): Promise<RoleEntity> {
		try {
			return this.roleRepository.create(data);
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Update record(s).
	 * @param {number} id - Primary key of the table.
	 * @param {UpdateRoleDto} data - Data which need to be updated in database table.
	 */
	update(id: number, data: UpdateRoleDto): Promise<RoleEntity> {
		try {
			return this.roleRepository.update(id, data);
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Create / update role.
	 * @param {CreateRoleDto | UpdateRoleDto} data - Data which need to be stored in database table.
	 */
	saveChanges(data: CreateRoleDto | UpdateRoleDto): Promise<RoleEntity> {
		try {
			return this.roleRepository.saveChanges(data);
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Delete role based on the given role id.
	 * @param {number} id - a unique id / primary key.
	 */
	delete(id: number): Promise<DeleteResult> {
		try {
			return this.roleRepository.delete(id);
		} catch (error) {
			throw error;
		}
	}
}
