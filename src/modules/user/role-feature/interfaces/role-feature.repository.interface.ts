import { BaseRepositoryInterface } from '@base/interfaces/base.repository.interface';
import { RoleFeatureEntity } from '../entities/role-feature.entity';

/**
 * A contract for [RoleFeatureRepository]{@link RoleFeatureRepository} class.
 */
export type RoleFeatureRepositoryInterface =
	BaseRepositoryInterface<RoleFeatureEntity>;
