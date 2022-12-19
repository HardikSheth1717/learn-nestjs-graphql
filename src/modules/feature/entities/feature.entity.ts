import { Entity, Column } from 'typeorm';

/**
 * An entity class for feature table in the database.
 */
@Entity('feature')
export class FeatureEntity {
	/**
	 * PK of the table.
	 */
	@Column({
		name: 'feature_id',
		type: 'int',
		comment: 'PK of the table.',
		generated: 'increment',
		primary: true,
		nullable: false,
		unique: true
	})
	featureId: number;

	@Column({
		name: 'feature_group_id',
		type: 'int',
		comment: 'FK of the table.',
		nullable: false
	})
	featureGroupId: number;
	/**
	 * Unique code of the feature.
	 */
	@Column({
		name: 'code',
		type: 'varchar',
		length: 50,
		comment: 'Unique code of the feature.',
		nullable: false,
		unique: true
	})
	code: string;

	/**
	 * Name of the feature.
	 */
	@Column({
		name: 'feature_name',
		type: 'varchar',
		length: 100,
		comment: 'Name of the feature.',
		nullable: false,
		unique: true
	})
	featureName: string;

	/**
	 * Remarks / description of the feature.
	 */
	@Column({
		name: 'remarks',
		type: 'varchar',
		comment: 'Name of the feature.',
		nullable: true
	})
	remarks: string;

	/**
	 * Image path for feature.
	 */
	@Column({
		name: 'featureimage',
		type: 'varchar',
		length: 500,
		comment: 'Feature image path.',
		nullable: true
	})
	featureImage: string;

	/**
	 * User id of a user who created the record.
	 */
	@Column({
		name: 'createdby',
		type: 'int',
		comment: 'User id of a user who created the record.',
		nullable: false
	})
	createdBy: number;

	/**
	 * Date and time when the record is created.
	 */
	@Column({
		name: 'createddate',
		type: 'datetime',
		comment: 'Date and time when the record is created.',
		nullable: false
	})
	createdDate: Date;

	/**
	 * User id of a user who modified the record.
	 */
	@Column({
		name: 'modifiedby',
		type: 'int',
		comment: 'User id of a user who modified the record.',
		nullable: true
	})
	modifiedBy: number;

	/**
	 * Date and time when the record is modified.
	 */
	@Column({
		name: 'modifieddate',
		type: 'datetime',
		comment: 'Date and time when the record is modified.',
		nullable: true
	})
	modifiedDate: Date;
}
