import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseAbstractRepository } from '@base/repositories/base.repository';
import { UserRoleRepositoryInterface } from '../interfaces/user-role.repository.interface';
import { UserRoleEntity } from '../entities/user-role.entity';

/**
 * A repository for user_role table.
 */
@Injectable()
export class UserRoleRepository
	extends BaseAbstractRepository<UserRoleEntity>
	implements UserRoleRepositoryInterface
{
	constructor(
		@InjectRepository(UserRoleEntity)
		private readonly userRoleRepository: Repository<UserRoleEntity>
	) {
		super(userRoleRepository);
	}
}
