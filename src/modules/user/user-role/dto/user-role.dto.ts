import { IsDefined, IsInt, IsPositive } from 'class-validator';

/**
 * A DTO class for create new user role mappging.
 */
export class UserRoleDto {
	/**
	 * FK to user table.
	 */
	@IsDefined()
	@IsInt()
	@IsPositive()
	userId: number;

	/**
	 * FK to role table.
	 */
	@IsDefined()
	@IsInt()
	@IsPositive()
	roleId: number;
}
