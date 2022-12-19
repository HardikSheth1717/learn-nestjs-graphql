import { Entity, Column, OneToMany } from 'typeorm';

/**
 * An entity class for feature_group table in the database.
 */
@Entity('feature_group')
export class FeatureGroupEntity {
	/**
	 * PK of the table.
	 */
	@Column({
		name: 'feature_group_id',
		type: 'int',
		comment: 'PK of the table.',
		generated: 'increment',
		primary: true,
		nullable: false,
		unique: true
	})
	featureGroupId: number;

	/**
	 * Name of the feature group.
	 */

	@Column({
		name: 'feature_group_name',
		type: 'varchar',
		length: 100,
		comment: 'Name of the feature group.',
		nullable: false,
		unique: true
	})
	featureGroupName: string;

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
