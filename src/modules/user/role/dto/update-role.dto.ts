import { OmitType, PartialType } from '@nestjs/swagger';
import {
	IsDateString,
	IsDefined,
	IsInt,
	IsOptional,
	IsPositive
} from 'class-validator';
import { CreateRoleDto } from './create-role.dto';

export class UpdateRoleDto extends PartialType(
	OmitType(CreateRoleDto, ['createdBy', 'createdDate'] as const)
) {
	/**
	 * Primary key of the table.
	 */
	@IsDefined()
	@IsInt()
	@IsPositive()
	roleId: number;

	/**
	 * User id of a user who modified the record.
	 */
	@IsOptional()
	@IsInt()
	@IsPositive()
	modifiedBy: number;

	/**
	 * Date and time when the record is modified.
	 */
	@IsOptional()
	@IsDateString()
	modifiedDate: string = new Date().toISOString();
}
