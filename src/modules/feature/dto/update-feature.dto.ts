import { OmitType, PartialType } from '@nestjs/swagger';
import {
	IsDateString,
	IsDefined,
	IsInt,
	IsPositive,
	IsOptional
} from 'class-validator';
import { CreateFeatureDto } from './create-feature.dto';

export class UpdateFeatureDto extends PartialType(
	OmitType(CreateFeatureDto, ['createdBy', 'createdDate'] as const)
) {
	/**
	 * Primary key of the table.
	 */
	@IsDefined()
	@IsInt()
	@IsPositive()
	featureId: number;

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
