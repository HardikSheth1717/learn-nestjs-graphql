import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Redis } from 'ioredis';
import { RedisManager } from '@liaoliaots/nestjs-redis';
import { Request } from 'express';

import { EnvKeys } from '@core/constants/enums/env.enum';
import { Decrypt } from '@utils/decrypt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	private readonly redisClient: Redis;

	constructor(
		private readonly redisManager: RedisManager,
		private readonly configService: ConfigService
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			algorithms: ['HS256'],
			ignoreExpiration: false,
			secretOrKey: configService.get<string>(
				EnvKeys.JWT_ACCESS_TOKEN_SECRET
			),
			passReqToCallback: true,
			issuer: 'Hardik Sheth',
			audience: 'https://localhost:44308/'
		});

		this.redisClient = this.redisManager.getClient();
	}

	async validate(request: Request, payload: any) {
		// Console.log(payload);
		const decrypted = await new Decrypt(
			this.configService
		).generateDecryptedString(payload);
		const decryptedData = JSON.parse(decrypted);
		//  Console.log(decryptedData);

		// Extract access token from request header.
		const accessToken: string = request.headers.authorization.split(' ')[1];

		// Extract session id from the payload extracted from JWT access token.
		const sessionId: string = decryptedData.sessionId;

		// Check if token against this session id is exists in Redis.
		const redisAccessToken: string = await this.redisClient.get(sessionId);

		// Compare access tokens received from request and redis.
		if (
			!redisAccessToken ||
			!accessToken ||
			!(redisAccessToken === accessToken)
		) {
			throw new UnauthorizedException();
		}

		return {
			userId: decryptedData.sub,
			userName: decryptedData.userName,
			sessionId: decryptedData.sessionId,
			permissions: decryptedData.permissions
		};
	}
}
