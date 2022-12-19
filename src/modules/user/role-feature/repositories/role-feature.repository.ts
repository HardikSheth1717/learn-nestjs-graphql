import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseAbstractRepository } from '@base/repositories/base.repository';
import { RoleFeatureRepositoryInterface } from '../interfaces/role-feature.repository.interface';
import { RoleFeatureEntity } from '../entities/role-feature.entity';

/**
 * A repository for role_feature table.
 */
@Injectable()
export class RoleFeatureRepository
	extends BaseAbstractRepository<RoleFeatureEntity>
	implements RoleFeatureRepositoryInterface
{
	constructor(
		@InjectRepository(RoleFeatureEntity)
		private readonly roleFeatureRepository: Repository<RoleFeatureEntity>
	) {
		super(roleFeatureRepository);
	}
}
