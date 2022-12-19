import { Transform, TransformFnParams } from 'class-transformer';
import {
	IsDefined,
	IsInt,
	Length,
	IsPositive,
	IsDateString,
	IsNotEmpty,
	IsOptional
} from 'class-validator';

/**
 * A DTO class for Feature.
 */
export class CreateFeatureDto {
	/**
	 * Unique code of the feature.
	 */
	@IsDefined()
	@IsNotEmpty()
	@Transform(({ value }: TransformFnParams) => value.trim())
	@Length(2, 50)
	code: string;

	@IsDefined()
	@IsInt()
	@IsPositive()
	featureGroupId: number;

	/**
	 * Name of the feature.
	 */
	@IsDefined()
	@IsNotEmpty()
	@Transform(({ value }: TransformFnParams) => value.trim())
	@Length(2, 100)
	featureName: string;

	/**
	 * Remarks / description of the item feature.
	 */
	@IsOptional()
	remarks?: string = null;

	/**
	 * User id of a user who created the record.
	 */
	@IsOptional()
	@IsInt()
	@IsPositive()
	createdBy: number;

	/**
	 * Date and time when the record is created.
	 */
	@IsOptional()
	@IsDateString()
	createdDate: string = new Date().toISOString();
}
