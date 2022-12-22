import { Field, InputType, Int, PartialType, OmitType } from '@nestjs/graphql';
import {
	IsDateString,
	IsDefined,
	IsInt,
	IsOptional,
	IsPositive
} from 'class-validator';
import { CreateRoleDto } from './create-role.dto';

@InputType()
export class UpdateRoleDto extends PartialType(
	OmitType(CreateRoleDto, ['createdBy', 'createdDate'] as const)
) {
	/**
	 * Primary key of the table.
	 */
	@IsDefined()
	@IsInt()
	@IsPositive()
	@Field(() => Int!)
	roleId: number;

	/**
	 * User id of a user who modified the record.
	 */
	@IsOptional()
	@IsInt()
	@IsPositive()
	@Field({ nullable: true })
	modifiedBy: number;

	/**
	 * Date and time when the record is modified.
	 */
	@IsOptional()
	@IsDateString()
	@Field({ nullable: true })
	modifiedDate: string = new Date().toISOString();
}
