import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FeatureService } from './feature.service';
import { FeatureController } from './feature.controller';

import { DIToken } from '@core/enums/ditoken.enum';
import { FeatureRepository } from './repositories/feature.repository';

import { FeatureEntity } from './entities/feature.entity';

@Module({
	imports: [TypeOrmModule.forFeature([FeatureEntity])],
	providers: [
		{
			provide: DIToken.FEATURE_REPOSITORY_INTERFACE,
			useClass: FeatureRepository
		},
		{
			provide: DIToken.FEATURE_SERVICE_INTERFACE,
			useClass: FeatureService
		}
	],
	controllers: [FeatureController]
})
export class FeatureModule {}
