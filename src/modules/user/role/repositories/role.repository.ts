import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseAbstractRepository } from '@base/repositories/base.repository';
import { RoleRepositoryInterface } from '../interfaces/role.repository.interface';
import { RoleEntity } from '../entities/role.entity';

/**
 * A repository for role table.
 */
@Injectable()
export class RoleRepository
	extends BaseAbstractRepository<RoleEntity>
	implements RoleRepositoryInterface
{
	constructor(
		@InjectRepository(RoleEntity)
		private readonly roleRepository: Repository<RoleEntity>
	) {
		super(roleRepository);
	}
}
