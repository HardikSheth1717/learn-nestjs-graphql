import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserAccountService } from './user-account.service';
import { UserAccountController } from './user-account.controller';

import { DIToken } from '@core/enums/ditoken.enum';
import { UserAccountRepository } from './repositories/user-account.repository';

import { UserAccountEntity } from './entities/user-account.entity';
import { RoleEntity } from '../role/entities/role.entity';
import { RoleModule } from '../role/role.module';

@Module({
	imports: [
		RoleModule,
		TypeOrmModule.forFeature([UserAccountEntity, RoleEntity])
		//UserRoleModule
	],
	providers: [
		{
			provide: DIToken.USER_ACCOUNT_REPOSITORY_INTERFACE,
			useClass: UserAccountRepository
		},
		{
			provide: DIToken.USER_ACCOUNT_SERVICE_INTERFACE,
			useClass: UserAccountService
		}
	],
	controllers: [UserAccountController],
	exports: [
		TypeOrmModule,
		{
			provide: DIToken.USER_ACCOUNT_SERVICE_INTERFACE,
			useClass: UserAccountService
		}
	]
})
export class UserAccountModule {}
