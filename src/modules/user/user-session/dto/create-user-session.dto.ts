import { Transform, TransformFnParams } from 'class-transformer';
import {
	IsDefined,
	IsInt,
	IsPositive,
	IsDateString,
	IsNotEmpty,
	IsString,
	MaxLength,
	IsOptional
} from 'class-validator';

/**
 * A DTO class for create new user session.
 */
export class CreateUserSessionDto {
	/**
	 * FK to user table.
	 */
	@IsDefined()
	@IsInt()
	@IsPositive()
	userId: number;

	/**
	 * Unique session id generate by uuid.
	 */
	@IsDefined()
	@IsNotEmpty()
	@Transform(({ value }: TransformFnParams) => value.trim())
	@MaxLength(500)
	@IsString()
	sessionId: string;

	/**
	 * Refresh token.
	 */
	@IsDefined()
	@IsNotEmpty()
	@Transform(({ value }: TransformFnParams) => value.trim())
	@IsString()
	refreshToken: string;

	/**
	 * Expiry time of the refresh token.
	 */
	@IsDefined()
	@IsInt()
	@IsPositive()
	expiryTime: number;

	/**
	 * Device details like manufacturar name, model name etc.
	 */
	@MaxLength(500)
	@IsString()
	@IsOptional()
	deviceName?: string = null;

	/**
	 * Operating system details like OS name, version etc.
	 */
	@MaxLength(500)
	@IsString()
	@IsOptional()
	operatingSystem?: string = null;

	/**
	 * Browser details like broeser name, version etc.
	 */
	@MaxLength(500)
	@IsString()
	@IsOptional()
	browserName?: string = null;

	/**
	 * Location details like latitude, longitude, address details etc.
	 */
	@MaxLength(500)
	@IsString()
	@IsOptional()
	location?: string = null;

	/**
	 * IP address of the device.
	 */
	@MaxLength(50)
	@IsString()
	@IsOptional()
	ipAddress?: string = null;

	/**
	 * Logged in date time.
	 */
	@IsDefined()
	@IsDateString()
	loggedInDateTime: Date;
}
