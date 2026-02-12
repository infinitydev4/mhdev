import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as compression from 'compression';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  const configService = app.get(ConfigService);

  // Security
  app.use(helmet());
  app.use(compression());

  // CORS
  app.enableCors({
    origin: configService.get('CORS_ORIGIN')?.split(',') || '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Global prefix
  const apiPrefix = configService.get('API_PREFIX', 'api/v1');
  app.setGlobalPrefix(apiPrefix);

  // Versioning
  app.enableVersioning({
    type: VersioningType.URI,
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Swagger documentation
  if (configService.get('SWAGGER_ENABLED') === 'true') {
    const config = new DocumentBuilder()
      .setTitle(configService.get('SWAGGER_TITLE', 'Portfolio Blog API'))
      .setDescription(
        configService.get(
          'SWAGGER_DESCRIPTION',
          'API REST pour le module Blog',
        ),
      )
      .setVersion(configService.get('SWAGGER_VERSION', '1.0'))
      .addBearerAuth()
      .addTag('auth', 'Authentification et autorisation')
      .addTag('articles', 'Gestion des articles de blog')
      .addTag('categories', 'Gestion des catégories')
      .addTag('tags', 'Gestion des tags')
      .addTag('users', 'Gestion des utilisateurs')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(
      configService.get('SWAGGER_PATH', 'api/docs'),
      app,
      document,
      {
        swaggerOptions: {
          persistAuthorization: true,
        },
      },
    );
  }

  const port = configService.get('PORT', 3001);
  await app.listen(port);

  console.log(`
    🚀 Application is running on: http://localhost:${port}/${apiPrefix}
    📚 Swagger documentation: http://localhost:${port}/${configService.get('SWAGGER_PATH', 'api/docs')}
  `);
}

bootstrap();
