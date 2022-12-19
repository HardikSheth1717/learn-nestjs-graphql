import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { LocalStrategy } from './strategies/local.strategy';

import { UserAccountModule } from '@modules/user/user-account/user-account.module';
import { DIToken } from '@core/constants/enums/ditoken.enum';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { UserSessionModule } from '@modules/user/user-session/user-session.module';
import { JwtLogoutStrategy } from './strategies/jwt-logout.strategy';
import { AuthRepository } from './repositories/auth.repository';

@Module({
	imports: [
		UserSessionModule,
		UserAccountModule,
		PassportModule,
		JwtModule.register({
			secret: 'H@rd1k',
			signOptions: {
				expiresIn: '60s'
			}
		})
	],
	providers: [
		{
			provide: DIToken.AUTH_REPOSITORY_INTERFACE,
			useClass: AuthRepository
		},
		{
			provide: DIToken.AUTH_SERVICE_INTERFACE,
			useClass: AuthService
		},
		LocalStrategy,
		JwtStrategy,
		JwtRefreshStrategy,
		JwtLogoutStrategy
	],
	controllers: [AuthController],
	exports: [
		{
			provide: DIToken.AUTH_SERVICE_INTERFACE,
			useClass: AuthService
		}
	]
})
export class AuthModule {}
