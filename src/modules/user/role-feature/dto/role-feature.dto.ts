import {
	IsBoolean,
	IsDefined,
	IsInt,
	IsOptional,
	IsPositive
} from 'class-validator';

/**
 * A DTO class for create new role feature mappging.
 */
export class RoleFeatureDto {
	/**
	 * PK of the table.
	 */
	@IsInt()
	@IsPositive()
	@IsOptional()
	roleFeatureId: number;

	/**
	 * FK to role table.
	 */
	@IsDefined()
	@IsInt()
	@IsPositive()
	roleId: number;

	/**
	 * FK to feature table.
	 */
	@IsDefined()
	@IsInt()
	@IsPositive()
	featureId: number;

	/**
	 * User have permission to create new record or not.
	 */
	@IsDefined()
	@IsBoolean()
	canCreate: boolean;

	/**
	 * User have permission to modify an existing record or not.
	 */
	@IsDefined()
	@IsBoolean()
	canModify: boolean;

	/**
	 * User have permission to view records or not.
	 */
	@IsDefined()
	@IsBoolean()
	canView: boolean;

	/**
	 * User have permission to delete an existing record or not.
	 */
	@IsDefined()
	@IsBoolean()
	canDelete: boolean;

	/**
	 * User have permission to manage records or not.
	 */
	@IsDefined()
	@IsBoolean()
	canManage: boolean;
}
