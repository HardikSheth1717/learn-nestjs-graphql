import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseAbstractRepository } from '@base/repositories/base.repository';
import { FeatureGroupRepositoryInterface } from '../interfaces/feature-group.repository.interface';
import { FeatureGroupEntity } from '../entities/feature-group.entity';

/**
 * A repository for featureGroup table.
 */
@Injectable()
export class FeatureGroupRepository
	extends BaseAbstractRepository<FeatureGroupEntity>
	implements FeatureGroupRepositoryInterface
{
	constructor(
		@InjectRepository(FeatureGroupEntity)
		private readonly featureGroupRepository: Repository<FeatureGroupEntity>
	) {
		super(featureGroupRepository);
	}
}
