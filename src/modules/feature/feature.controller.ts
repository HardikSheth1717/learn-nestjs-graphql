import {
	Controller,
	Post,
	Get,
	Put,
	Delete,
	Inject,
	Param,
	ParseIntPipe,
	Body
} from '@nestjs/common';

import { DIToken } from '@core/enums/ditoken.enum';

import { FeatureServiceInterface } from './interfaces/feature.service.interface';

import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';
import { FeatureEntity } from './entities/feature.entity';
import { BaseController } from '@base/controller/base.controller';
import { Permissions } from '@core/decorators/permission.decorator';
import { PermissionEnum } from '@core/constants/enums/permission.enum';
import { User } from '@core/decorators/user.decorator';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';

/**
 * An API for feature master.
 */
@Controller('feature')
export class FeatureController extends BaseController {
	constructor(
		@Inject(DIToken.FEATURE_SERVICE_INTERFACE)
		private featureService: FeatureServiceInterface
	) {
		super();
	}

	/**
	 * Returns a list of all the records of feature.
	 */
	@Get()
	@Permissions(`FEATURE:${PermissionEnum.VIEW}`)
	public async get(): Promise<FeatureEntity[]> {
		return await this.featureService.getAll();
	}

	/**
	 * Returns a single record of feature based on the given feature id.
	 * @param {number} id - a unique id / primary key.
	 */
	@Get(':id')
	@Permissions(`FEATURE:${PermissionEnum.VIEW}`)
	public async getOneById(
		@Param('id', ParseIntPipe) id: number
	): Promise<FeatureEntity> {
		return await this.featureService.getOneById(id);
	}

	/**
	 * Returns a single record of feature based on the given feature id.
	 * @param {number} id - a unique id / primary key.
	 */
	@Get('group/:groupId')
	@Permissions(`FEATURE:${PermissionEnum.VIEW}`)
	public async getManyByGroupId(
		@Param('groupId', ParseIntPipe) id: number
	): Promise<FeatureEntity[]> {
		return await this.featureService.getManyByCondition({
			where: {
				featureGroupId: id
			}
		});
	}

	/**
	 * Create new feature.
	 * @param {CreateFeatureDto} data - Data which need to be stored in database table.
	 */
	@Post()
	@Permissions(`FEATURE:${PermissionEnum.CREATE}`)
	public async create(
		@Body() data: CreateFeatureDto,
		@User() user: UserAccountEntity
	): Promise<number> {
		data.createdBy = user.userId;
		return (await this.featureService.create(data)).featureId;
	}

	/**
	 * Update an existing feature.
	 * @param {UpdateFeatureDto} data - Data which need to be stored in database table.
	 */
	@Put()
	@Permissions(`FEATURE:${PermissionEnum.MODIFY}`)
	public async update(
		@Body() data: UpdateFeatureDto,
		@User() user: UserAccountEntity
	): Promise<boolean> {
		data.modifiedBy = user.userId;
		return (
			(await this.featureService.update(data.featureId, data)).featureId >
			0
		);
	}

	/**
	 * Delete feature based on the given feature id.
	 * @param {number} id - a unique id / primary key.
	 */
	@Delete(':id')
	@Permissions(`FEATURE:${PermissionEnum.DELETE}`)
	public async delete(
		@Param('id', ParseIntPipe) id: number
	): Promise<boolean> {
		return (await this.featureService.delete(id)).affected > 0;
	}
}
