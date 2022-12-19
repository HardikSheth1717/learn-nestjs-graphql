import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseAbstractRepository } from '@base/repositories/base.repository';
import { FeatureRepositoryInterface } from '../interfaces/feature.repository.interface';
import { FeatureEntity } from '../entities/feature.entity';

/**
 * A repository for feature table.
 */
@Injectable()
export class FeatureRepository
	extends BaseAbstractRepository<FeatureEntity>
	implements FeatureRepositoryInterface
{
	constructor(
		@InjectRepository(FeatureEntity)
		private readonly featureRepository: Repository<FeatureEntity>
	) {
		super(featureRepository);
	}
}
