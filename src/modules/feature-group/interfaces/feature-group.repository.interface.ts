import { BaseRepositoryInterface } from '@base/interfaces/base.repository.interface';
import { FeatureGroupEntity } from '../entities/feature-group.entity';

/**
 * A contract for [FeatureGroupRepository]{@link FeatureGroupRepository} class.
 */
export type FeatureGroupRepositoryInterface =
	BaseRepositoryInterface<FeatureGroupEntity>;
