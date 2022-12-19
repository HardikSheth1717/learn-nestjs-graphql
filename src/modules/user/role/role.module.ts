import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoleService } from './role.service';
import { RoleResolver } from './role.resolver';

import { DIToken } from '@core/enums/ditoken.enum';
import { RoleRepository } from './repositories/role.repository';

import { RoleEntity } from './entities/role.entity';

@Module({
	imports: [TypeOrmModule.forFeature([RoleEntity])],
	providers: [
		{
			provide: DIToken.ROLE_REPOSITORY_INTERFACE,
			useClass: RoleRepository
		},
		{
			provide: DIToken.ROLE_SERVICE_INTERFACE,
			useClass: RoleService
		},
		RoleResolver
	],
	controllers: [],
	exports: [
		TypeOrmModule,
		{
			provide: DIToken.ROLE_SERVICE_INTERFACE,
			useClass: RoleService
		}
	]
})
export class RoleModule {}
