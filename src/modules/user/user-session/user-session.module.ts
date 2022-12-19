import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserSessionService } from './user-session.service';

import { DIToken } from '@core/enums/ditoken.enum';
import { UserSessionRepository } from './repositories/user-session.repository';

import { UserSessionEntity } from './entities/user-session.entity';

@Module({
	imports: [TypeOrmModule.forFeature([UserSessionEntity])],
	providers: [
		{
			provide: DIToken.USER_SESSION_REPOSITORY_INTERFACE,
			useClass: UserSessionRepository
		},
		{
			provide: DIToken.USER_SESSION_SERVICE_INTERFACE,
			useClass: UserSessionService
		}
	],
	controllers: [],
	exports: [
		TypeOrmModule,
		{
			provide: DIToken.USER_SESSION_SERVICE_INTERFACE,
			useClass: UserSessionService
		}
	]
})
export class UserSessionModule {}
