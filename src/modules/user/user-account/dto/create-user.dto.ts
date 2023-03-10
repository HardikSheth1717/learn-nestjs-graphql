import { Transform, TransformFnParams } from 'class-transformer';
import {
	IsDefined,
	IsInt,
	Min,
	Length,
	IsPositive,
	IsDateString,
	IsNotEmpty,
	Max,
	IsString,
	MaxLength,
	IsEmail,
	IsOptional,
	IsArray
} from 'class-validator';

/**
 * A DTO class for create new user.
 */
export class CreateUserDto {
	/**
	 * FK to account table.
	 */
	@IsDefined()
	@IsInt()
	@IsPositive()
	accountId: number;

	/**
	 * First name of the user.
	 */
	@IsDefined()
	@IsNotEmpty()
	@Transform(({ value }: TransformFnParams) => value.trim())
	@Length(2, 100)
	@IsString()
	firstName: string;

	/**
	 * Last name of the user.
	 */
	@IsDefined()
	@IsNotEmpty()
	@Transform(({ value }: TransformFnParams) => value.trim())
	@Length(2, 100)
	@IsString()
	lastName: string;

	/**
	 * Username of the user.
	 */
	@IsDefined()
	@IsNotEmpty()
	@Transform(({ value }: TransformFnParams) => value.trim())
	@Length(5, 200)
	userName: string;

	/**
	 * Email address of the user.
	 */
	@IsDefined()
	@IsNotEmpty()
	@Transform(({ value }: TransformFnParams) => value.trim())
	@MaxLength(200)
	@IsEmail()
	email: string;

	/**
	 * Password to login into the system.
	 */
	@IsDefined()
	@IsNotEmpty()
	@Transform(({ value }: TransformFnParams) => value.trim())
	@Length(8, 20)
	password: string;

	/**
	 * Is active user.
	 */
	@IsDefined()
	@IsInt()
	@Min(0)
	@Max(1)
	isActive: number;

	/**
	 * Profile image path.
	 */
	@MaxLength(500)
	@IsOptional()
	profileImage?: string = null;

	/**
	 * User id of a user who created the record.
	 */
	@IsDefined()
	@IsInt()
	@IsPositive()
	createdBy: number;

	/**
	 * Date and time when the record is created.
	 */
	@IsDefined()
	@IsDateString()
	createdDate: Date;

	/**
	 * Is generated by the system.
	 */
	@IsDefined()
	@IsInt()
	@Min(0)
	@Max(1)
	isSystem: number;

	/**
	 * Is confirmed / varified user (email verification).
	 */
	@IsDefined()
	@IsInt()
	@Min(0)
	@Max(1)
	isConfirmed: number;

	@IsDefined()
	@IsArray()
	roles: string[];
}
