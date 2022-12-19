import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { AppResolver } from './app.resolver';
import { AppService } from './app.service';

import { CategoryModule } from '@modules/category/category.module';
import { UserAccountModule } from '@modules/user/user-account/user-account.module';
import { AuthModule } from '@modules/auth/auth.module';

import { ResponseInterceptor } from '@core/interceptors/response.interceptor';
import { JwtAuthGuard } from '@core/guards/passport/jwt-auth.guard';
import { UserSessionModule } from '@modules/user/user-session/user-session.module';
import configuration from '@config/envs/configuration';
import { ValidationExceptionFilter } from '@core/filters/validation.filter';
import { GenericExceptionFilter } from '@core/filters/generic.filter';
import { RoleModule } from '@modules/user/role/role.module';
import { RoleFeatureModule } from '@modules/user/role-feature/role-feature.module';
import { PermissionGuard } from '@core/guards/auth/permission.guard';
import { FeatureModule } from '@modules/feature/feature.module';
import { FeatureGroupModule } from '@modules/feature-group/feature-group.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
	imports: [
		GraphQLModule.forRootAsync<ApolloDriverConfig>({
			driver: ApolloDriver,
			useFactory: () => ({
				autoSchemaFile: join(process.cwd(), 'src/config/graphql/schema.gql')
			})
		}),
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: !process.env.NODE_ENV
				? '.env'
				: `.env.${process.env.NODE_ENV}`,
			load: [configuration]
		}),
		TypeOrmModule.forRootAsync({
			name: 'default',
			useFactory: (configService: ConfigService) => ({
				...configService.get('database.mysql')
			}),
			inject: [ConfigService]
		}),
		ServeStaticModule.forRoot({
			rootPath: `${__dirname}/../public`,
			renderPath: '/'
		}),
		RedisModule.forRootAsync({
			useFactory: (configService: ConfigService) => ({
				closeClient: true,
				config: {
					...configService.get('database.redis')
				}
			}),
			inject: [ConfigService]
		}),
		AuthModule,
		CategoryModule,
		RoleModule,
		FeatureModule,
		FeatureGroupModule,
		RoleFeatureModule,
		UserAccountModule,
		UserSessionModule
	],
	controllers: [],
	providers: [
		// {
		// 	provide: APP_FILTER,
		// 	useClass: GenericExceptionFilter
		// },
		// {
		// 	provide: APP_FILTER,
		// 	useClass: ValidationExceptionFilter
		// },
		// {
		// 	provide: APP_INTERCEPTOR,
		// 	useClass: ResponseInterceptor
		// },
		// {
		// 	provide: APP_GUARD,
		// 	useClass: JwtAuthGuard
		// },
		// {
		// 	provide: APP_GUARD,
		// 	useClass: PermissionGuard
		// },
		AppService,
		AppResolver
	]
})
export class AppModule {}
