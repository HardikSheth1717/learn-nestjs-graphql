import { Column } from 'typeorm';

/**
 * An entity class for user_role table in the database.
 */
// @Entity('user_role')
export class UserRoleEntity {
	/**
	 * PK of the table.
	 */
	@Column({
		name: 'user_role_id',
		type: 'int',
		comment: 'PK of the table.',
		generated: 'increment',
		primary: true,
		nullable: false,
		unique: true
	})
	userRoleId: number;

	/**
	 * FK to user table.
	 */
	@Column({
		name: 'user_id',
		type: 'int',
		comment: 'FK to user table.',
		nullable: false
	})
	userId: number;

	/**
	 * FK to role table.
	 */
	@Column({
		name: 'role_id',
		type: 'smallint',
		comment: 'FK to role table.',
		nullable: false
	})
	roleId: number;
}
