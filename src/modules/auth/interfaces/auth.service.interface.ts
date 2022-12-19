import { LoginDto } from '../dto/login.dto';
import { PermissionDto } from '../dto/permissions.dto';

/**
 * A service contract which must be implemented by [AuthService]{@link AuthService}.
 */
export interface AuthServiceInterface {
	/**
	 * Validates the user for given username and password.
	 * @param {string} userName - User name.
	 * @param {string} password - Password.
	 */
	authenticate(userName: string, password: string): Promise<any>;

	/**
	 * Generate JWT access token and refresh token and create new user session.
	 * @param user A simple object with userName and userId properties.
	 * @returns A JWT access token and refresh token.
	 */
	createUserSession(
		user: { userName: string; userId: number },
		login: LoginDto
	): Promise<{
		accessToken: string;
		refreshToken: string;
	}>;

	/**
	 * Generate Refresh token.
	 * @param user A simple object with userName and userId properties.
	 * @returns A JWT refresh token.
	 */
	generateRefreshToken(user: {
		userName: string;
		userId: number;
	}): Promise<{ refreshToken: string }>;

	/**
	 * Generate access token.
	 * @param user A simple object with userName, userId and session id properties.
	 * @returns A JWT access token.
	 */
	generateAccessToken(user: {
		userName: string;
		userId: number;
		sessionId: string;
	}): Promise<{ accessToken: string }>;

	/**
	 * Get user permissions.
	 * @param {number} userId - User id.
	 */
	getUserPermissions(userId: number): Promise<PermissionDto[]>;
}
