import { INestApplication } from '@nestjs/common';
import AuthSwagger from '@modules/auth/swagger/auth.swagger';
import CategorySwagger from '@modules/category/swagger/category.swagger';
import FeatureSwagger from '@modules/feature/swagger/feature.swagger';
import FeatureGroupSwagger from '@modules/feature-group/swagger/feature-group.swagger';
import RoleSwagger from '@modules/user/role/swagger/role.swagger';
import RoleFeatureSwagger from '@modules/user/role-feature/swagger/role-feature.swagger';
import UserAccountSwagger from '@modules/user/user-account/swagger/user-account.swagger';

export function MainSwagger(app: INestApplication) {
	AuthSwagger(app);
	FeatureSwagger(app);
	RoleSwagger(app);
	RoleFeatureSwagger(app);
	UserAccountSwagger(app);
	FeatureSwagger(app);
	FeatureGroupSwagger(app);
	CategorySwagger(app);
}
