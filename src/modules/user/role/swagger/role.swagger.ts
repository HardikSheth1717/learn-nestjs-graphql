import { INestApplication } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { createDocumentBuilder } from '@config/swagger/util.swagger';
import { RoleModule } from '../role.module';
import { CUSTOM_CSS } from '@core/constants/swagger.constant';
import { SwaggerApiKeys } from '@core/constants/enums/swagger.enum';

export default function getSwaggerDocument(app: INestApplication) {
	const documentBuilder = createDocumentBuilder('Role');

	const document = SwaggerModule.createDocument(app, documentBuilder, {
		include: [RoleModule]
	});

	SwaggerModule.setup(SwaggerApiKeys.ROLE, app, document, {
		customCss: CUSTOM_CSS,
		customJs: 'custom.js',
		swaggerOptions: {
			persistAuthorization: true
		}
	});
}
