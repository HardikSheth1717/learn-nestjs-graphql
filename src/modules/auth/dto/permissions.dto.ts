/**
 * A DTO class for permissions.
 */
export class PermissionDto {
	/**
	 * Feature id.
	 */
	featureId: number;

	/**
	 * Feature name.
	 */
	featureName: string;

	/**
	 * Feature code.
	 */
	code: string;

	/**
	 * User have permission to create new record or not.
	 */
	canCreate: boolean;

	/**
	 * User have permission to modify an existing record or not.
	 */
	canModify: boolean;

	/**
	 * User have permission to view records or not.
	 */
	canView: boolean;

	/**
	 * User have permission to delete an existing record or not.
	 */
	canDelete: boolean;

	/**
	 * User have permission to manage records or not.
	 */
	canManage: boolean;
}
