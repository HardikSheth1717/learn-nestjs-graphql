import { OmitType, PartialType } from '@nestjs/swagger';
import { IsDefined, IsInt, IsPositive } from 'class-validator';
import { CreateUserSessionDto } from './create-user-session.dto';

/**
 * A DTO class for update an existing user session.
 */
export class UpdateUserSessionDto extends PartialType(
	OmitType(CreateUserSessionDto, [
		'userId',
		'deviceName',
		'browserName',
		'ipAddress',
		'location',
		'operatingSystem',
		'loggedInDateTime'
	] as const)
) {
	/**
	 * Primary key of the table.
	 */
	@IsDefined()
	@IsInt()
	@IsPositive()
	userSessionId: number;
}
