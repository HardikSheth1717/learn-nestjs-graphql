import { OmitType, PartialType } from '@nestjs/swagger';
import {
	IsDateString,
	IsDefined,
	IsInt,
	IsOptional,
	IsPositive
} from 'class-validator';
import { CreateFeatureGroupDto } from './create-feature-group.dto';

export class UpdateFeatureGroupDto extends PartialType(
	OmitType(CreateFeatureGroupDto, ['createdBy', 'createdDate'] as const)
) {
	/**
	 * Primary key of the table.
	 */
	@IsDefined()
	@IsInt()
	@IsPositive()
	featureGroupId: number;

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
