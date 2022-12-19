import { Entity, Column } from 'typeorm';

/**
 * An entity class for user_session table in the database.
 */
@Entity('user_session')
export class UserSessionEntity {
	/**
	 * PK of the table.
	 */
	@Column({
		name: 'user_session_id',
		type: 'int',
		comment: 'PK of the table.',
		generated: 'increment',
		primary: true,
		nullable: false,
		unique: true
	})
	userSessionId: number;

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
	 * Unique session id generate by uuid.
	 */
	@Column({
		name: 'session_id',
		type: 'varchar',
		length: 500,
		comment: 'Unique session id generate by uuid.',
		nullable: true,
		unique: true
	})
	sessionId: string;

	/**
	 * Refresh token.
	 */
	@Column({
		name: 'refresh_token',
		type: 'text',
		comment: 'Refresh token.',
		nullable: true
	})
	refreshToken: string;

	/**
	 * Expiry time of the refresh token.
	 */
	@Column({
		name: 'expirytime',
		type: 'bigint',
		comment: 'Expiry time of the refresh token.',
		nullable: true
	})
	expiryTime: number;

	/**
	 * Device details like manufacturar name, model name etc.
	 */
	@Column({
		name: 'device',
		type: 'varchar',
		length: 500,
		comment: 'Device details like manufacturar name, model name etc.',
		nullable: true
	})
	deviceName: string;

	/**
	 * Operating system details like OS name, version etc.
	 */
	@Column({
		name: 'operating_system',
		type: 'varchar',
		length: 500,
		comment: 'Operating system details like OS name, version etc.',
		nullable: true
	})
	operatingSystem: string;

	/**
	 * Browser details like broeser name, version etc.
	 */
	@Column({
		name: 'browser',
		type: 'varchar',
		length: 500,
		comment: 'Browser details like broeser name, version etc.',
		nullable: true
	})
	browserName: string;

	/**
	 * Location details like latitude, longitude, address details etc.
	 */
	@Column({
		name: 'location',
		type: 'varchar',
		length: 500,
		comment:
			'Location details like latitude, longitude, address details etc.',
		nullable: true
	})
	location: string;

	/**
	 * IP address of the device.
	 */
	@Column({
		name: 'ip_address',
		type: 'varchar',
		length: 50,
		comment: 'IP address of the device.',
		nullable: true
	})
	ipAddress: string;

	/**
	 * Logged in date time.
	 */
	@Column({
		name: 'loggedin_datetime',
		type: 'datetime',
		comment: 'Logged in date time.',
		nullable: false
	})
	loggedInDateTime: Date;
}
