import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Redis } from 'ioredis';
import { RedisManager } from '@liaoliaots/nestjs-redis';

import { DIToken } from '@core/enums/ditoken.enum';
import { EnvKeys } from '@core/constants/enums/env.enum';

import { UserSessionService } from '@modules/user/user-session/user-session.service';
import { UpdateUserSessionDto } from '@modules/user/user-session/dto/update-user-session.dto';
import { UserSessionEntity } from '@modules/user/user-session/entities/user-session.entity';
import { Decrypt } from '@utils/decrypt';

@Injectable()
export class JwtLogoutStrategy extends PassportStrategy(
	Strategy,
	'jwt-logout'
) {
	private readonly redisClient: Redis;

	constructor(
		private readonly redisManager: RedisManager,
		@Inject(DIToken.USER_SESSION_SERVICE_INTERFACE)
		private readonly userSessionService: UserSessionService,
		private readonly configService: ConfigService
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			algorithms: ['HS256'],
			ignoreExpiration: false,
			secretOrKey: configService.get<string>(
				EnvKeys.JWT_ACCESS_TOKEN_SECRET
			),
			issuer: 'Hardik Sheth',
			audience: 'https://localhost:44308/'
		});

		this.redisClient = this.redisManager.getClient();
	}

	async validate(payload: any) {
		const decrypted = await new Decrypt(
			this.configService
		).generateDecryptedString(payload);
		const decryptedData = JSON.parse(decrypted);

		// Extract userId and sessionId from the payload extracted from JWT access token.
		const userId: number = decryptedData.sub;
		const sessionId: string = decryptedData.sessionId;

		// Delete token against this session id is exists in Redis.
		await this.redisClient.del(sessionId);

		// Check if refresh token with the given userId and sessionId is present in user_session table.
		const userSession: UserSessionEntity =
			await this.userSessionService.getOneByCondition({
				where: {
					userId: userId,
					sessionId: sessionId
				}
			});

		// Update sessionId, refresh token and expirydate with null.
		const userSessionDto = new UpdateUserSessionDto();
		userSessionDto.userSessionId = userSession.userSessionId;
		userSessionDto.sessionId = null;
		userSessionDto.refreshToken = null;
		userSessionDto.expiryTime = null;

		await this.userSessionService.update(
			userSession.userSessionId,
			userSessionDto
		);

		return {
			userId: decryptedData.sub,
			userName: decryptedData.userName,
			sessionId: decryptedData.sessionId,
			permissions: decryptedData.permissions
		};
	}
}
