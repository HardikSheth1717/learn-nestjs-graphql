import { INestApplication } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { createDocumentBuilder } from '@config/swagger/util.swagger';
import { FeatureGroupModule } from '../feature-group.module';
import { CUSTOM_CSS } from '@core/constants/swagger.constant';
import { SwaggerApiKeys } from '@core/constants/enums/swagger.enum';

export default function getSwaggerDocument(app: INestApplication) {
	const documentBuilder = createDocumentBuilder('Feature Group');

	const document = SwaggerModule.createDocument(app, documentBuilder, {
		include: [FeatureGroupModule]
	});

	SwaggerModule.setup(SwaggerApiKeys.FEATURE_GROUP, app, document, {
		customCss: CUSTOM_CSS,
		customJs: 'custom.js',
		swaggerOptions: {
			persistAuthorization: true
		}
	});
}
