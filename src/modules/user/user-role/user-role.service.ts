import { Injectable, Inject } from '@nestjs/common';

import { FindOneOptions, FindManyOptions, DeleteResult } from 'typeorm';

import { DIToken } from '@core/enums/ditoken.enum';

import { UserRoleRepositoryInterface } from './interfaces/user-role.repository.interface';
import { UserRoleServiceInterface } from './interfaces/user-role.service.interface';

import { UserRoleDto } from './dto/user-role.dto';
import { UserRoleEntity } from './entities/user-role.entity';

/**
 * A service / provider for user master.
 */
@Injectable()
export class UserRoleService implements UserRoleServiceInterface {
	constructor(
		@Inject(DIToken.USER_ROLE_REPOSITORY_INTERFACE)
		private readonly userRoleRepository: UserRoleRepositoryInterface
	) {}

	/**
	 * Returns a list of all the records of user role.
	 */
	getAll(): Promise<UserRoleEntity[]> {
		try {
			return this.userRoleRepository.getAll();
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Returns a single record of user role based on the given user role id.
	 * @param {number} id - a unique id / primary key.
	 */
	getOneById(id: number): Promise<UserRoleEntity> {
		try {
			return this.userRoleRepository.getOneById({
				where: {
					userRoleId: id
				}
			});
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Returns a single record of user role based on the given conditions.
	 * @param {FindOneOptions} condition - Condition to apply in query.
	 */
	getOneByCondition(condition: FindOneOptions<any>): Promise<UserRoleEntity> {
		try {
			return this.userRoleRepository.getOneByCondition(condition);
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Returns a list of records of user role based on the given conditions.
	 * @param {FindManyOptions} condition - Condition to apply in query.
	 */
	getManyByCondition(
		condition: FindManyOptions<any>
	): Promise<UserRoleEntity[]> {
		try {
			return this.userRoleRepository.getManyByCondition(condition);
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Create record(s).
	 * @param {UserRoleDto} data - Data which need to be inserted in database table.
	 */
	create(data: UserRoleDto): Promise<UserRoleEntity> {
		try {
			//Console.log(data);
			const userRoleEntity: UserRoleEntity = new UserRoleEntity();
			userRoleEntity.userRoleId = 0;
			// (userRoleEntity.userId = data.userId),
			// (userRoleEntity.roleId = data.roleId);

			return this.userRoleRepository.create(userRoleEntity);
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Update record(s).
	 * @param {number} id - Primary key of the table.
	 * @param {UserRoleDto} data - Data which need to be updated in database table.
	 */
	update(id: number, data: UserRoleDto): Promise<UserRoleEntity> {
		try {
			return this.userRoleRepository.update(id, data);
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Create / update user.
	 * @param {UserRoleDto} data - Data which need to be stored in database table.
	 */
	saveChanges(data: UserRoleDto): Promise<UserRoleEntity> {
		try {
			return this.userRoleRepository.saveChanges(data);
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Delete user role based on the given user role id.
	 * @param {number} id - a unique id / primary key.
	 */
	delete(id: number): Promise<DeleteResult> {
		try {
			return this.userRoleRepository.delete(id);
		} catch (error) {
			throw error;
		}
	}
}
