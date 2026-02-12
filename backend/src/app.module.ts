import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig, jwtConfig } from './config';

@Module({
  imports: [
    // Configuration globale
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, jwtConfig],
      envFilePath: ['.env.local', '.env'],
      cache: true,
    }),

    // TypeORM avec configuration asynchrone
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('database'),
      }),
      inject: [ConfigService],
    }),

    // Modules fonctionnels seront ajoutés ici
    // AuthModule,
    // UsersModule,
    // ArticlesModule,
    // CategoriesModule,
    // TagsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
