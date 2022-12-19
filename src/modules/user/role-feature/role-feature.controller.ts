import {
	Controller,
	Post,
	Get,
	Put,
	Delete,
	Inject,
	Param,
	ParseIntPipe,
	Body,
	UseInterceptors,
	ClassSerializerInterceptor
} from '@nestjs/common';

import { DIToken } from '@core/enums/ditoken.enum';

import { RoleFeatureServiceInterface } from './interfaces/role-feature.service.interface';

import { RoleFeatureDto } from './dto/role-feature.dto';
import { RoleFeatureEntity } from './entities/role-feature.entity';
import { BaseController } from '@base/controller/base.controller';

/**
 * An API for role_fearure table.
 */
@Controller('role_feature')
export class RoleFeatureController extends BaseController {
	constructor(
		@Inject(DIToken.ROLE_FEATURE_SERVICE_INTERFACE)
		private roleFeatureService: RoleFeatureServiceInterface
	) {
		super();
	}

	/**
	 * Returns a list of all the records of role feature.
	 */
	@UseInterceptors(ClassSerializerInterceptor)
	@Get()
	public async get(): Promise<RoleFeatureEntity[]> {
		return await this.roleFeatureService.getAll();
	}

	/**
	 * Returns a single record of role feature based on the given role feature id.
	 * @param {number} id - a unique id / primary key.
	 */
	@UseInterceptors(ClassSerializerInterceptor)
	@Get(':id')
	public async getOneById(
		@Param('id', ParseIntPipe) id: number
	): Promise<RoleFeatureEntity> {
		return await this.roleFeatureService.getOneById(id);
	}

	/**
	 * Create new role feature.
	 * @param {RoleFeatureDto} data - Data which need to be stored in database table.
	 */
	@Post()
	public async create(@Body() data: RoleFeatureDto): Promise<number> {
		return (await this.roleFeatureService.create(data)).roleFeatureId;
	}

	/**
	 * Update an existing role feature.
	 * @param {RoleFeatureDto} data - Data which need to be stored in database table.
	 */
	@Put()
	public async update(@Body() data: RoleFeatureDto): Promise<boolean> {
		return (
			(await this.roleFeatureService.update(data.roleFeatureId, data))
				.roleFeatureId > 0
		);
	}

	/**
	 * Delete role feature based on the given role feature id.
	 * @param {number} id - a unique id / primary key.
	 */
	@Delete(':id')
	public async delete(
		@Param('id', ParseIntPipe) id: number
	): Promise<boolean> {
		return (await this.roleFeatureService.delete(id)).affected > 0;
	}
}
