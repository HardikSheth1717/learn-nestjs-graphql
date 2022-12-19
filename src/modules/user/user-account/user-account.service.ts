import { Injectable, Inject } from '@nestjs/common';

import { FindOneOptions, FindManyOptions, DeleteResult } from 'typeorm';

import { DIToken } from '@core/enums/ditoken.enum';

import { UserAccountRepositoryInterface } from './interfaces/user-account.repository.interface';
import { UserAccountServiceInterface } from './interfaces/user-account.service.interface';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserAccountEntity } from './entities/user-account.entity';
import { RoleEntity } from '../role/entities/role.entity';
import { RoleServiceInterface } from '../role/interfaces/role.service.interface';

/**
 * A service / provider for user master.
 */
@Injectable()
export class UserAccountService implements UserAccountServiceInterface {
	constructor(
		@Inject(DIToken.USER_ACCOUNT_REPOSITORY_INTERFACE)
		private readonly userAccountRepository: UserAccountRepositoryInterface,
		@Inject(DIToken.ROLE_SERVICE_INTERFACE)
		private readonly roleService: RoleServiceInterface // @Inject(DIToken.USER_ROLE_SERVICE_INTERFACE) // private readonly userRoleService: UserRoleServiceInterface
	) {}

	/**
	 * Returns a list of all the records of user.
	 */
	getAll(): Promise<UserAccountEntity[]> {
		try {
			return this.userAccountRepository.getAll();
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Returns a single record of user based on the given user id.
	 * @param {number} id - a unique id / primary key.
	 */
	getOneById(id: number): Promise<UserAccountEntity> {
		try {
			return this.userAccountRepository.getOneById({
				where: {
					userId: id
				}
			});
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Returns a single record of user based on the given conditions.
	 * @param {FindOneOptions} condition - Condition to apply in query.
	 */
	getOneByCondition(
		condition: FindOneOptions<any>
	): Promise<UserAccountEntity> {
		try {
			return this.userAccountRepository.getOneByCondition(condition);
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Returns a list of records of user based on the given conditions.
	 * @param {FindManyOptions} condition - Condition to apply in query.
	 */
	getManyByCondition(
		condition: FindManyOptions<any>
	): Promise<UserAccountEntity[]> {
		try {
			return this.userAccountRepository.getManyByCondition(condition);
		} catch (error) {
			throw error;
		}
	}

	async create(data: CreateUserDto): Promise<UserAccountEntity> {
		try {
			const userAccountEntity: UserAccountEntity =
				new UserAccountEntity();
			(userAccountEntity.userId = 0),
				(userAccountEntity.accountId = data.accountId),
				(userAccountEntity.firstName = data.firstName),
				(userAccountEntity.lastName = data.lastName),
				(userAccountEntity.userName = data.userName),
				(userAccountEntity.email = data.email),
				(userAccountEntity.password = data.password),
				(userAccountEntity.isActive = data.isActive),
				(userAccountEntity.profileImage = data.profileImage),
				(userAccountEntity.createdBy = data.createdBy),
				(userAccountEntity.createdDate = data.createdDate),
				(userAccountEntity.modifiedBy = null),
				(userAccountEntity.modifiedDate = null),
				(userAccountEntity.isSystem = data.isSystem),
				(userAccountEntity.isConfirmed = data.isConfirmed);

			const userRoles: RoleEntity[] = await Promise.all(
				data.roles.map(role =>
					this.roleService.getOneByCondition({
						where: {
							roleName: role
						}
					})
				)
			);

			userAccountEntity.roles = userRoles;
			return this.userAccountRepository.create(userAccountEntity);
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Update record(s).
	 * @param {number} id - Primary key of the table.
	 * @param {UpdateUserDto} data - Data which need to be updated in database table.
	 */
	async update(id: number, data: UpdateUserDto): Promise<UserAccountEntity> {
		try {
			const userAccountEntity: UserAccountEntity =
				new UserAccountEntity();
			(userAccountEntity.userId = data.userId),
				(userAccountEntity.accountId = data.accountId),
				(userAccountEntity.firstName = data.firstName),
				(userAccountEntity.lastName = data.lastName),
				(userAccountEntity.userName = data.userName),
				(userAccountEntity.email = data.email),
				(userAccountEntity.password = data.password),
				(userAccountEntity.isActive = data.isActive),
				(userAccountEntity.profileImage = data.profileImage),
				(userAccountEntity.modifiedBy = data.modifiedBy),
				(userAccountEntity.modifiedDate = data.modifiedDate),
				(userAccountEntity.isSystem = data.isSystem),
				(userAccountEntity.isConfirmed = data.isConfirmed);

			const userRoles: RoleEntity[] = await Promise.all(
				data.roles.map(role =>
					this.roleService.getOneByCondition({
						where: {
							roleName: role
						}
					})
				)
			);

			userAccountEntity.roles = userRoles;
			return this.userAccountRepository.update(id, userAccountEntity);
		} catch (error) {
			throw error;
		}
		// Try {
		//   Return this.userAccountRepository.update(id, data);
		// } catch (error) {
		//   Throw error;
		// }
	}

	/**
	 * Create / update user.
	 * @param {CreateUserDto | UpdateUserDto} data - Data which need to be stored in database table.
	 */
	saveChanges(
		data: CreateUserDto | UpdateUserDto
	): Promise<UserAccountEntity> {
		try {
			return this.userAccountRepository.saveChanges(data);
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Delete user based on the given user id.
	 * @param {number} id - a unique id / primary key.
	 */
	delete(id: number): Promise<DeleteResult> {
		try {
			return this.userAccountRepository.delete(id);
		} catch (error) {
			throw error;
		}
	}
}
