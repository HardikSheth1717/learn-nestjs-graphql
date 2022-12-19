import { PermissionDto } from '../dto/permissions.dto';

/**
 * A contract for [AuthRepository]{@link AuthRepository} class.
 */
export interface AuthRepositoryInterface {
	/**
	 * Get user permissions.
	 * @param {number} userId - User id.
	 */
	getUserPermissions(userId: number): Promise<PermissionDto[]>;
}
