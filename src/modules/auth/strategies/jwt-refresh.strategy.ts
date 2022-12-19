import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Request } from 'express';

import { DIToken } from '@core/enums/ditoken.enum';
import { EnvKeys } from '@core/constants/enums/env.enum';

import { UserSessionService } from '@modules/user/user-session/user-session.service';
import { UserSessionEntity } from '@modules/user/user-session/entities/user-session.entity';
import { Decrypt } from '@utils/decrypt';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
	Strategy,
	'jwt-refresh'
) {
	constructor(
		@Inject(DIToken.USER_SESSION_SERVICE_INTERFACE)
		private readonly userSessionService: UserSessionService,
		private readonly configService: ConfigService
	) {
		super({
			jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
			algorithms: ['HS256'],
			ignoreExpiration: false,
			secretOrKey: configService.get<string>(
				EnvKeys.JWT_REFRESH_TOKEN_SECRET
			),
			passReqToCallback: true,
			issuer: 'Hardik Sheth',
			audience: 'https://localhost:44308/'
		});
	}

	async validate(request: Request, payload: any) {
		// Extract refresh token from the request body
		const refreshToken: string = request.body.refreshToken;

		const decrypted = await new Decrypt(
			this.configService
		).generateDecryptedString(payload);
		const decryptedData = JSON.parse(decrypted);

		// Extract userId and session id from the payload extracted from JWT access token.
		const userId: number = decryptedData.sub;
		const sessionId: string = decryptedData.sessionId;

		// Check if refresh token with the given userId and sessionId is present in user_session table.
		const userSession: UserSessionEntity =
			await this.userSessionService.getOneByCondition({
				where: {
					userId: userId,
					sessionId: sessionId
				}
			});

		// Compare refresh tokens received from request and mysql.
		if (
			!userSession ||
			!userSession.refreshToken ||
			!(refreshToken === userSession.refreshToken)
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
