import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { DIToken } from '@core/enums/ditoken.enum';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(
		@Inject(DIToken.AUTH_SERVICE_INTERFACE)
		private authService: AuthService
	) {
		super();
	}

	async validate(userName: string, password: string): Promise<any> {
		const user = await this.authService.authenticate(userName, password);

		if (!user) {
			throw new UnauthorizedException();
		}

		return user;
	}
}
