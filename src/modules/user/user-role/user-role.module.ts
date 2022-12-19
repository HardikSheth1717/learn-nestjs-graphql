import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserRoleService } from './user-role.service';
import { UserRoleController } from './user-role.controller';

import { DIToken } from '@core/enums/ditoken.enum';
import { UserRoleRepository } from './repositories/user-role.repository';

import { UserRoleEntity } from './entities/user-role.entity';

@Module({
	imports: [TypeOrmModule.forFeature([UserRoleEntity])],
	providers: [
		{
			provide: DIToken.USER_ROLE_REPOSITORY_INTERFACE,
			useClass: UserRoleRepository
		},
		{
			provide: DIToken.USER_ROLE_SERVICE_INTERFACE,
			useClass: UserRoleService
		}
	],
	controllers: [UserRoleController],
	exports: [
		TypeOrmModule,
		{
			provide: DIToken.USER_ROLE_SERVICE_INTERFACE,
			useClass: UserRoleService
		}
	]
})
export class UserRoleModule {}
