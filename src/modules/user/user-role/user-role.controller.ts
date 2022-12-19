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

import { UserRoleServiceInterface } from './interfaces/user-role.service.interface';

import { UserRoleDto } from './dto/user-role.dto';
import { UserRoleEntity } from './entities/user-role.entity';
import { ApiBearerAuth } from '@nestjs/swagger';

/**
 * An API for user_role table.
 */
@Controller('userrole')
@ApiBearerAuth()
export class UserRoleController {
	constructor(
		@Inject(DIToken.USER_ROLE_SERVICE_INTERFACE)
		private userRoleService: UserRoleServiceInterface
	) {}

	/**
	 * Returns a list of all the records of user role.
	 */
	@UseInterceptors(ClassSerializerInterceptor)
	@Get()
	public async get(): Promise<UserRoleEntity[]> {
		return await this.userRoleService.getAll();
	}

	/**
	 * Returns a single record of user role based on the given user role id.
	 * @param {number} id - a unique id / primary key.
	 */
	@UseInterceptors(ClassSerializerInterceptor)
	@Get(':id')
	public async getOneById(
		@Param('id', ParseIntPipe) id: number
	): Promise<UserRoleEntity> {
		return await this.userRoleService.getOneById(id);
	}

	/**
	 * Create new user role.
	 * @param {UserRoleDto} data - Data which need to be stored in database table.
	 */
	@Post()
	public async create(@Body() data: UserRoleDto): Promise<number> {
		return (await this.userRoleService.create(data)).userRoleId;
	}

	/**
	 * Update an existing user role.
	 * @param {UserRoleDto} data - Data which need to be stored in database table.
	 */
	@Put()
	public async update(@Body() data: UserRoleDto): Promise<boolean> {
		return (
			(await this.userRoleService.update(data.userId, data)).userRoleId >
			0
		);
	}

	/**
	 * Delete user role based on the given user role id.
	 * @param {number} id - a unique id / primary key.
	 */
	@Delete(':id')
	public async delete(
		@Param('id', ParseIntPipe) id: number
	): Promise<boolean> {
		return (await this.userRoleService.delete(id)).affected > 0;
	}
}
