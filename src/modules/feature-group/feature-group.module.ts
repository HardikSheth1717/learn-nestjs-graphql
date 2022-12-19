import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FeatureGroupService } from './feature-group.service';
import { FeatureGroupController } from './feature-group.controller';

import { DIToken } from '@core/enums/ditoken.enum';
import { FeatureGroupRepository } from './repositories/feature-group.repository';

import { FeatureGroupEntity } from './entities/feature-group.entity';

@Module({
	imports: [TypeOrmModule.forFeature([FeatureGroupEntity])],
	providers: [
		{
			provide: DIToken.FEATURE_GROUP_REPOSITORY_INTERFACE,
			useClass: FeatureGroupRepository
		},
		{
			provide: DIToken.FEATURE_GROUP_SERVICE_INTERFACE,
			useClass: FeatureGroupService
		}
	],
	controllers: [FeatureGroupController]
})
export class FeatureGroupModule {}
