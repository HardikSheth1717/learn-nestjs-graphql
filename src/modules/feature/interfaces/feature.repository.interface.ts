import { BaseRepositoryInterface } from '@base/interfaces/base.repository.interface';
import { FeatureEntity } from '../entities/feature.entity';

/**
 * A contract for [FeatureRepository]{@link FeatureRepository} class.
 */
export type FeatureRepositoryInterface = BaseRepositoryInterface<FeatureEntity>;
