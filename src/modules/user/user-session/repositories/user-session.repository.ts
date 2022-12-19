import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseAbstractRepository } from '@base/repositories/base.repository';
import { UserSessionRepositoryInterface } from '../interfaces/user-session.repository.interface';
import { UserSessionEntity } from '../entities/user-session.entity';

/**
 * A repository for user_session table.
 */
@Injectable()
export class UserSessionRepository
	extends BaseAbstractRepository<UserSessionEntity>
	implements UserSessionRepositoryInterface
{
	constructor(
		@InjectRepository(UserSessionEntity)
		private readonly userSessionRepository: Repository<UserSessionEntity>
	) {
		super(userSessionRepository);
	}
}
