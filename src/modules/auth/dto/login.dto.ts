import {
	IsDefined,
	IsNotEmpty,
	IsOptional,
	IsString,
	Length,
	MaxLength
} from 'class-validator';

/**
 * A DTO class for login.
 */
export class LoginDto {
	/**
	 * Username of the user.
	 */
	@IsDefined()
	@IsNotEmpty()
	@Length(5, 200)
	username: string;
	/**
	 * Password to login into the system.
	 */
	@IsDefined()
	@IsNotEmpty()
	@Length(8, 20)
	password: string;
	/**
	 * Device details like manufacturar name, model name etc.
	 * @example 'iPhone 8'
	 */
	@MaxLength(500)
	@IsString()
	@IsOptional()
	deviceName?: string = null;

	/**
	 * Operating system details like OS name, version etc.
	 * @example 'IOS 15'
	 */
	@MaxLength(500)
	@IsString()
	@IsOptional()
	operatingSystem?: string = null;

	/**
	 * Browser details like broeser name, version etc.
	 * @example 'Google Chrome'
	 */
	@MaxLength(500)
	@IsString()
	@IsOptional()
	browserName?: string = null;

	/**
	 * Location details like latitude, longitude, address details etc.
	 * @example 'Surat, Gujarat, India'
	 */
	@MaxLength(500)
	@IsString()
	@IsOptional()
	location?: string = null;

	/**
	 * IP address of the device.
	 * @example '60.117.25.33'
	 */
	@MaxLength(50)
	@IsString()
	@IsOptional()
	ipAddress?: string = null;
}
