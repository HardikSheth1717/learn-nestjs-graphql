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

import { FeatureGroupServiceInterface } from './interfaces/feature-group.service.interface';

import { CreateFeatureGroupDto } from './dto/create-feature-group.dto';
import { UpdateFeatureGroupDto } from './dto/update-feature-group.dto';
import { FeatureGroupEntity } from './entities/feature-group.entity';
import { BaseController } from '@base/controller/base.controller';
import { Permissions } from '@core/decorators/permission.decorator';
import { PermissionEnum } from '@core/constants/enums/permission.enum';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';
import { User } from '@core/decorators/user.decorator';

/**
 * An API for featureGroup master.
 */
@Controller('featureGroup')
export class FeatureGroupController extends BaseController {
	constructor(
		@Inject(DIToken.FEATURE_GROUP_SERVICE_INTERFACE)
		private featureGroupService: FeatureGroupServiceInterface
	) {
		super();
	}

	/**
	 * Returns a list of all the records of featureGroup.
	 */
	@Get()
	@Permissions(`FTRGRP:${PermissionEnum.VIEW}`)
	public async get(): Promise<FeatureGroupEntity[]> {
		return await this.featureGroupService.getAll();
	}

	/**
	 * Returns a single record of featureGroup based on the given featureGroup id.
	 * @param {number} id - a unique id / primary key.
	 */
	@Get(':id')
	@Permissions(`FTRGRP:${PermissionEnum.VIEW}`)
	public async getOneById(
		@Param('id', ParseIntPipe) id: number
	): Promise<FeatureGroupEntity> {
		return await this.featureGroupService.getOneById(id);
	}

	/**
	 * Create new featureGroup.
	 * @param {CreateFeatureGroupDto} data - Data which need to be stored in database table.
	 */
	@Post()
	//@Permissions(`FTRGRP:${PermissionEnum.CREATE}`)
	public async create(
		@Body() data: CreateFeatureGroupDto,
		@User() user: UserAccountEntity
	): Promise<number> {
		//Console.log(data);
		data.createdBy = user.userId;
		return (await this.featureGroupService.create(data)).featureGroupId;
	}

	/**
	 * Update an existing featureGroup.
	 * @param {UpdateFeatureGroupDto} data - Data which need to be stored in database table.
	 */
	@Put()
	@Permissions(`FTRGRP:${PermissionEnum.MODIFY}`)
	public async update(
		@Body() data: UpdateFeatureGroupDto,
		@User() user: UserAccountEntity
	): Promise<boolean> {
		data.modifiedBy = user.userId;
		return (
			(await this.featureGroupService.update(data.featureGroupId, data))
				.featureGroupId > 0
		);
	}

	/**
	 * Delete featureGroup based on the given featureGroup id.
	 * @param {number} id - a unique id / primary key.
	 */
	@Delete(':id')
	@Permissions(`FTRGRP:${PermissionEnum.DELETE}`)
	public async delete(
		@Param('id', ParseIntPipe) id: number
	): Promise<boolean> {
		return (await this.featureGroupService.delete(id)).affected > 0;
	}
}
