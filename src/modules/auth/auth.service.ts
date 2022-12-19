import {
	Injectable,
	Inject,
	UnauthorizedException,
	InternalServerErrorException
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { RedisManager } from '@liaoliaots/nestjs-redis';
import { Redis } from 'ioredis';

import { DIToken } from '@core/enums/ditoken.enum';
import { EnvKeys } from '@core/enums/env.enum';

import { AuthServiceInterface } from './interfaces/auth.service.interface';

import { UserAccountService } from '@modules/user/user-account/user-account.service';
import { UserSessionService } from '@modules/user/user-session/user-session.service';
import { CreateUserSessionDto } from '@modules/user/user-session/dto/create-user-session.dto';
import { LoginDto } from './dto/login.dto';
import { PermissionDto } from './dto/permissions.dto';
import { AuthRepository } from './repositories/auth.repository';
import { Encrypt } from '@utils/encrypt';

/**
 * A service / provider for authentication.
 */
@Injectable()
export class AuthService implements AuthServiceInterface {
	private readonly redisClient: Redis;

	constructor(
		@Inject(DIToken.USER_ACCOUNT_SERVICE_INTERFACE)
		private readonly userAccountService: UserAccountService,
		@Inject(DIToken.USER_SESSION_SERVICE_INTERFACE)
		private readonly userSessionService: UserSessionService,
		private jwtService: JwtService,
		private readonly redisManager: RedisManager,
		private readonly configService: ConfigService,
		@Inject(DIToken.AUTH_REPOSITORY_INTERFACE)
		private readonly authRepository: AuthRepository
	) {
		this.redisClient = this.redisManager.getClient();
	}

	/**
	 * Validates the user for given username and password.
	 * @param {string} userName - User name.
	 * @param {string} password - Password.
	 */
	async authenticate(userName: string, password: string): Promise<any> {
		try {
			const userAccount = await this.userAccountService.getOneByCondition(
				{
					where: {
						userName: userName
					}
				}
			);

			if (
				userAccount &&
				(await compare(password, userAccount.password.toString()))
			) {
				const { password, ...user } = userAccount as any;
				//Console.log(password);
				return user;
			} else {
				return null;
			}
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Generate JWT access token and refresh token and create new user session.
	 * @param user A simple object with userName and userId properties.
	 * @returns A JWT access token and refresh token.
	 */
	async createUserSession(
		user: {
			userName: string;
			userId: number;
			permissions: PermissionDto[];
		},
		login: LoginDto
	): Promise<{
		accessToken: string;
		refreshToken: string;
	}> {
		// Generate unique and random session id.
		const sessionId = uuidv4();

		// Create payload using userId, sessionId and userName
		const payload = {
			userName: user.userName,
			sessionId: sessionId,
			sub: user.userId,
			permissions: user.permissions
		};

		const encryptedPayload = await new Encrypt(
			this.configService
		).generateEncryptedString(JSON.stringify(payload));

		// Generate access token using above encrypted payload.
		const accessToken = this.jwtService.sign(encryptedPayload, {
			secret: this.configService.get<string>(
				EnvKeys.JWT_ACCESS_TOKEN_SECRET
			),
			expiresIn: parseInt(
				this.configService.get<string>(EnvKeys.JWT_ACCESS_TOKEN_EXPIRY)
			),
			algorithm: 'HS256',
			issuer: 'Hardik Sheth',
			audience: 'https://localhost:44308/'
		});

		// Generate refresh token using above payload.
		const refreshToken = await this.generateRefreshToken({
			userName: user.userName,
			userId: user.userId,
			sessionId: sessionId,
			permissions: user.permissions
		});

		// Save access token in Redis against session id.
		this.redisClient.setex(
			sessionId,
			this.configService.get<number>(EnvKeys.JWT_ACCESS_TOKEN_EXPIRY),
			accessToken
		);

		// Save refresh token in MySQL database against user id and session id.
		const userSession = new CreateUserSessionDto();
		userSession.userId = user.userId;
		userSession.sessionId = sessionId;
		userSession.refreshToken = refreshToken.refreshToken;
		userSession.browserName = login.browserName;
		userSession.deviceName = login.deviceName;
		userSession.ipAddress = login.ipAddress;
		userSession.location = login.location;
		userSession.operatingSystem = login.operatingSystem;

		// Set expiry time and logged in date.
		const loggedinTime: Date = new Date();
		const expiryTime: Date = new Date();
		expiryTime.setSeconds(
			new Date().getSeconds() +
				this.configService.get<number>(EnvKeys.JWT_REFRESH_TOKEN_EXPIRY)
		);

		userSession.loggedInDateTime = loggedinTime;
		userSession.expiryTime = expiryTime.getTime();

		const result = await this.userSessionService.create(userSession);

		if (result.userSessionId > 0) {
			return {
				accessToken: accessToken,
				refreshToken: refreshToken.refreshToken
			};
		} else {
			throw new InternalServerErrorException();
		}
	}

	/**
	 * Generate Refresh token.
	 * @param user A simple object with userName and userId properties.
	 * @returns A JWT refresh token.
	 */
	async generateRefreshToken(user: {
		userName: string;
		userId: number;
		sessionId: string;
		permissions: PermissionDto[];
	}): Promise<{ refreshToken: string }> {
		const payload = {
			userName: user.userName,
			sessionId: user.sessionId,
			sub: user.userId,
			permissions: user.permissions
		};

		const encryptedPayload = await new Encrypt(
			this.configService
		).generateEncryptedString(JSON.stringify(payload));

		return {
			refreshToken: this.jwtService.sign(encryptedPayload, {
				secret: this.configService.get<string>(
					EnvKeys.JWT_REFRESH_TOKEN_SECRET
				),
				expiresIn: parseInt(
					this.configService.get<string>(
						EnvKeys.JWT_REFRESH_TOKEN_EXPIRY
					)
				),
				algorithm: 'HS256',
				issuer: 'Hardik Sheth',
				audience: 'https://localhost:44308/'
			})
		};
	}

	/**
	 * Generate access token.
	 * @param user A simple object with userName, userId and session id properties.
	 * @returns A JWT access token.
	 */
	async generateAccessToken(user: {
		userName: string;
		userId: number;
		sessionId: string;
		permissions: PermissionDto[];
	}): Promise<{ accessToken: string }> {
		try {
			// Create payload using userId, sessionId and userName
			const payload = {
				userName: user.userName,
				sessionId: user.sessionId,
				sub: user.userId,
				permissions: user.permissions
			};

			const encryptedPayload = await new Encrypt(
				this.configService
			).generateEncryptedString(JSON.stringify(payload));

			// Generate access token using above encrypted payload.
			const accessToken = this.jwtService.sign(encryptedPayload, {
				secret: this.configService.get<string>(
					EnvKeys.JWT_ACCESS_TOKEN_SECRET
				),
				expiresIn: parseInt(
					this.configService.get<string>(
						EnvKeys.JWT_ACCESS_TOKEN_EXPIRY
					)
				),
				algorithm: 'HS256',
				issuer: 'Hardik Sheth',
				audience: 'https://localhost:44308/'
			});

			// Save access token in Redis against session id.
			this.redisClient.setex(
				user.sessionId,
				this.configService.get<number>(EnvKeys.JWT_ACCESS_TOKEN_EXPIRY),
				accessToken
			);

			return {
				accessToken: accessToken
			};
		} catch (error) {
			throw new UnauthorizedException(
				'Your session has been expired. Please login again.'
			);
		}
	}

	/**
	 * Get user permissions.
	 * @param {number} userId - User id.
	 */
	getUserPermissions(userId: number): Promise<PermissionDto[]> {
		return this.authRepository.getUserPermissions(userId);
	}
}
