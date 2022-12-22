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
import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';

import { DIToken } from '@core/enums/ditoken.enum';

import { RoleServiceInterface } from './interfaces/role.service.interface';

import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleEntity } from './entities/role.entity';
import { BaseController } from '@base/controller/base.controller';
import { Permissions } from '@core/decorators/permission.decorator';
import { PermissionEnum } from '@core/constants/enums/permission.enum';
import { UserAccountEntity } from '../user-account/entities/user-account.entity';
import { User } from '@core/decorators/user.decorator';
import { NoAuthRoute } from '@core/decorators/noauth.decorator';

/**
 * An API for role master.
 */
@Resolver(() => RoleEntity)
export class RoleResolver extends BaseController {
	constructor(
		@Inject(DIToken.ROLE_SERVICE_INTERFACE)
		private roleService: RoleServiceInterface
	) {
		super();
	}

	/**
	 * Returns a list of all the records of role.
	 */
	@Permissions(`ROLE:${PermissionEnum.VIEW}`)
	@Query(() => [RoleEntity], { name: 'getRoles', description: 'Returns a list of all the records of role.' })
	public async get(): Promise<RoleEntity[]> {
		return await this.roleService.getAll();
	}

	/**
	 * Returns a single record of role based on the given role id.
	 * @param {number} id - a unique id / primary key.
	 */
	@Get(':id')
	@Permissions(`ROLE:${PermissionEnum.VIEW}`)
	@Query(() => RoleEntity, { name: 'getRole', description: 'Returns a single record of role based on the given role id.' })
	public async getOneById(
		@Args('id', { type: () => Int, description: 'A unique id / primary key.', nullable: false }) id: number
	): Promise<RoleEntity> {
		return await this.roleService.getOneById(id);
	}

	/**
	 * Create new role.
	 * @param {CreateRoleDto} data - Data which need to be stored in database table.
	 */
	@Permissions(`ROLE:${PermissionEnum.CREATE}`)
	@Mutation(() => RoleEntity, { name:'createRole', description: 'Create new role.' })
	public async create(
		@Args('data') data: CreateRoleDto
	): Promise<RoleEntity> {
		data.createdBy = 1;//user.userId;
		return (await this.roleService.create(data));
	}

	/**
	 * Update an existing role.
	 * @param {UpdateRoleDto} data - Data which need to be stored in database table.
	 */
	@Permissions(`ROLE:${PermissionEnum.MODIFY}`)
	@Mutation(() => RoleEntity, { name:'updateRole', description: 'Update an existing role.' })
	public async update(
		@Args('data') data: UpdateRoleDto
	): Promise<RoleEntity> {
		data.modifiedBy = 1;//user.userId;
		return (await this.roleService.update(data.roleId, data));
	}

	/**
	 * Delete role based on the given role id.
	 * @param {number} id - a unique id / primary key.
	 */
	@Permissions(`ROLE:${PermissionEnum.DELETE}`)
	@Mutation(() => Boolean, { name:'deleteRole', description: 'Delete role based on the given role id.' })
	public async delete(
		@Args('id', { type: () => Int, description: 'a unique id / primary key.', nullable: false }) id: number
	): Promise<boolean> {
		return (await this.roleService.delete(id)).affected > 0;
	}
}
