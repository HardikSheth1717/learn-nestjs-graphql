import { OmitType, PartialType } from '@nestjs/swagger';
import { IsDateString, IsDefined, IsInt, IsPositive } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

/**
 * A DTO class for update an existing user.
 */
export class UpdateUserDto extends PartialType(
	OmitType(CreateUserDto, ['createdBy', 'createdDate'] as const)
) {
	/**
	 * Primary key of the table.
	 */
	@IsDefined()
	@IsInt()
	@IsPositive()
	userId: number;

	/**
	 * User id of a user who modified the record.
	 */
	@IsDefined()
	@IsInt()
	@IsPositive()
	modifiedBy: number;

	/**
	 * Date and time when the record is modified.
	 */
	@IsDefined()
	@IsDateString()
	modifiedDate: Date;
}
