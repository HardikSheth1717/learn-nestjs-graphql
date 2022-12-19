import { INestApplication } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { createDocumentBuilder } from '@config/swagger/util.swagger';
import { CUSTOM_CSS } from '@core/constants/swagger.constant';
import { AuthModule } from '../auth.module';
import { SwaggerApiKeys } from '@core/constants/enums/swagger.enum';

export default function getSwaggerDocument(app: INestApplication) {
	const documentBuilder = createDocumentBuilder('Authentication');

	const document = SwaggerModule.createDocument(app, documentBuilder, {
		include: [AuthModule]
	});

	SwaggerModule.setup(SwaggerApiKeys.AUTH, app, document, {
		customCss: CUSTOM_CSS,
		customJs: 'custom.js',
		swaggerOptions: {
			persistAuthorization: true
		}
	});
}
