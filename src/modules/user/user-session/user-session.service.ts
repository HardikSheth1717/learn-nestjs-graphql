import { Injectable, Inject } from '@nestjs/common';

import { FindOneOptions, FindManyOptions, DeleteResult } from 'typeorm';

import { DIToken } from '@core/enums/ditoken.enum';

import { UserSessionRepositoryInterface } from './interfaces/user-session.repository.interface';
import { UserSessionServiceInterface } from './interfaces/user-session.service.interface';

import { CreateUserSessionDto } from './dto/create-user-session.dto';
import { UpdateUserSessionDto } from './dto/update-user-session.dto';
import { UserSessionEntity } from './entities/user-session.entity';

/**
 * A service / provider for user_session.
 */
@Injectable()
export class UserSessionService implements UserSessionServiceInterface {
	constructor(
		@Inject(DIToken.USER_SESSION_REPOSITORY_INTERFACE)
		private readonly userAccountRepository: UserSessionRepositoryInterface
	) {}

	/**
	 * Returns a list of all the records of user session.
	 */
	getAll(): Promise<UserSessionEntity[]> {
		try {
			return this.userAccountRepository.getAll();
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Returns a single record of user session based on the given session id.
	 * @param {number} id - a unique id / primary key.
	 */
	getOneById(id: number): Promise<UserSessionEntity> {
		try {
			return this.userAccountRepository.getOneById({
				where: {
					userSessionId: id
				}
			});
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Returns a single record of user session based on the given conditions.
	 * @param {FindOneOptions} condition - Condition to apply in query.
	 */
	getOneByCondition(
		condition: FindOneOptions<any>
	): Promise<UserSessionEntity> {
		try {
			return this.userAccountRepository.getOneByCondition(condition);
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Returns a list of records of user session based on the given conditions.
	 * @param {FindManyOptions} condition - Condition to apply in query.
	 */
	getManyByCondition(
		condition: FindManyOptions<any>
	): Promise<UserSessionEntity[]> {
		try {
			return this.userAccountRepository.getManyByCondition(condition);
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Create record(s).
	 * @param {CreateUserSessionDto} data - Data which need to be inserted in database table.
	 */
	create(data: CreateUserSessionDto): Promise<UserSessionEntity> {
		try {
			return this.userAccountRepository.create(data);
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Update record(s).
	 * @param {number} id - Primary key of the table.
	 * @param {UpdateUserSessionDto} data - Data which need to be updated in database table.
	 */
	update(id: number, data: UpdateUserSessionDto): Promise<UserSessionEntity> {
		try {
			return this.userAccountRepository.update(id, data);
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Create / update user session.
	 * @param {CreateUserSessionDto | UpdateUserSessionDto} data - Data which need to be stored in database table.
	 */
	saveChanges(
		data: CreateUserSessionDto | UpdateUserSessionDto
	): Promise<UserSessionEntity> {
		try {
			return this.userAccountRepository.saveChanges(data);
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Delete user session based on the given session id.
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
