import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseAbstractRepository } from '@base/repositories/base.repository';
import { UserAccountRepositoryInterface } from '../interfaces/user-account.repository.interface';
import { UserAccountEntity } from '../entities/user-account.entity';

/**
 * A repository for user table.
 */
@Injectable()
export class UserAccountRepository
	extends BaseAbstractRepository<UserAccountEntity>
	implements UserAccountRepositoryInterface
{
	constructor(
		@InjectRepository(UserAccountEntity)
		private readonly userAccountRepository: Repository<UserAccountEntity>
	) {
		super(userAccountRepository);
	}
}
