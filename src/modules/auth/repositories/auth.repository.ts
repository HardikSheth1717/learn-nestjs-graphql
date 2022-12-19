import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { PermissionDto } from '../dto/permissions.dto';
import { AuthRepositoryInterface } from '../interfaces/auth.repository.interface';

/**
 * A repository for item_category table.
 */
@Injectable()
export class AuthRepository implements AuthRepositoryInterface {
	constructor(@InjectDataSource() private readonly connection: DataSource) {}

	/**
	 * Get user permissions.
	 * @param {number} userId - User id.
	 */
	async getUserPermissions(userId: number): Promise<PermissionDto[]> {
		const permissions = await this.connection.query(
			`
			SELECT rf.feature_id featureId, f.feature_name featureName, f.code, 
			MAX(rf.canCreate) canCreate, MAX(rf.canModify) canModify, MAX(rf.canDelete) canDelete,
			MAX(rf.canView) canView, MAX(rf.canManage) canManage
			FROM user_role ur
			INNER JOIN role_feature rf ON ur.role_id = rf.role_id
			INNER JOIN role r ON rf.role_id = r.role_id
			INNER JOIN feature f ON rf.feature_id = f.feature_id
			WHERE ur.user_id = ?
			GROUP BY rf.feature_id, f.feature_name, f.code
			`,
			[userId]
		);

		const permissionsDto = permissions as PermissionDto[];
		return permissionsDto;
	}
}
