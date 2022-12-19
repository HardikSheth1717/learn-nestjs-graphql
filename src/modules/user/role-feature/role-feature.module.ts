import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoleFeatureService } from './role-feature.service';
import { RoleFeatureController } from './role-feature.controller';

import { DIToken } from '@core/enums/ditoken.enum';
import { RoleFeatureRepository } from './repositories/role-feature.repository';

import { RoleFeatureEntity } from './entities/role-feature.entity';

@Module({
	imports: [TypeOrmModule.forFeature([RoleFeatureEntity])],
	providers: [
		{
			provide: DIToken.ROLE_FEATURE_REPOSITORY_INTERFACE,
			useClass: RoleFeatureRepository
		},
		{
			provide: DIToken.ROLE_FEATURE_SERVICE_INTERFACE,
			useClass: RoleFeatureService
		}
	],
	controllers: [RoleFeatureController],
	exports: [
		TypeOrmModule,
		{
			provide: DIToken.ROLE_FEATURE_SERVICE_INTERFACE,
			useClass: RoleFeatureService
		}
	]
})
export class RoleFeatureModule {}
