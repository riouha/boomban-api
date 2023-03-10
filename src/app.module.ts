import { MiddlewareConsumer, Module } from '@nestjs/common';
import { PostModule } from './modules/post/post.module';
import { RssModule } from './modules/rss/rss.module';
import { appConfig } from './config/config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { CategoryModule } from './modules/category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [appConfig] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        ({
          type: 'postgres',
          host: configService.get('database.host'),
          port: configService.get<number>('database.port'),
          username: configService.get('database.username'),
          password: configService.get('database.password'),
          database: configService.get('database.dbname'),
          logging: configService.get<Array<string>>('database.logLevel'),
          entities: configService.get<Array<string>>('database.entities'),
          // autoLoadEntities: configService.get<boolean>('database.autoLoadEntities'),
          synchronize: true, //configService.get<boolean>('database.synchronize'),
          // dropSchema: configService.get<boolean>('database.dropSchema'),
        } as PostgresConnectionOptions),
      inject: [ConfigService],
    }),
    PostModule,
    RssModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
