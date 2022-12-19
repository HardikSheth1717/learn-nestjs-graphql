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

import { UserAccountServiceInterface } from './interfaces/user-account.service.interface';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserAccountEntity } from './entities/user-account.entity';
import { ApiBearerAuth } from '@nestjs/swagger';
import { NoAuthRoute } from '@core/decorators/noauth.decorator';

/**
 * An API for user master.
 */
@Controller('user')
export class UserAccountController {
	constructor(
		@Inject(DIToken.USER_ACCOUNT_SERVICE_INTERFACE)
		private userAccountService: UserAccountServiceInterface
	) {}

	/**
	 * Returns a list of all the records of user.
	 */
	@UseInterceptors(ClassSerializerInterceptor)
	@Get()
	@ApiBearerAuth()
	public async get(): Promise<UserAccountEntity[]> {
		return await this.userAccountService.getAll();
	}

	/**
	 * Returns a single record of user based on the given user id.
	 * @param {number} id - a unique id / primary key.
	 */
	@UseInterceptors(ClassSerializerInterceptor)
	@Get(':id')
	@ApiBearerAuth()
	public async getOneById(
		@Param('id', ParseIntPipe) id: number
	): Promise<UserAccountEntity> {
		return await this.userAccountService.getOneById(id);
	}

	/**
	 * Create new user.
	 * @param {CreateUserDto} data - Data which need to be stored in database table.
	 */
	@NoAuthRoute()
	@Post()
	public async create(@Body() data: CreateUserDto): Promise<number> {
		return (await this.userAccountService.create(data)).userId;
	}

	/**
	 * Update an existing user.
	 * @param {UpdateUserDto} data - Data which need to be stored in database table.
	 */
	@Put()
	@ApiBearerAuth()
	public async update(@Body() data: UpdateUserDto): Promise<boolean> {
		return (
			(await this.userAccountService.update(data.userId, data)).userId > 0
		);
	}

	/**
	 * Delete user based on the given user id.
	 * @param {number} id - a unique id / primary key.
	 */
	@Delete(':id')
	@ApiBearerAuth()
	public async delete(
		@Param('id', ParseIntPipe) id: number
	): Promise<boolean> {
		return (await this.userAccountService.delete(id)).affected > 0;
	}
}
