import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module.ts';
import { configuration } from './config/configuration.ts';
import { AgeGroup } from './entities/age-groups/age-group.entity.ts';
import { AgeGroupsModule } from './entities/age-groups/age-groups.module.ts';
import { Article } from './entities/articles/articles.entity.ts';
import { ArticlesModule } from './entities/articles/articles.module.ts';
import { Audience } from './entities/audiences/audiences.entity.ts';
import { AudiencesModule } from './entities/audiences/audiences.module.ts';
import { Category } from './entities/categories/category.entity.ts';
import { CategoriesModule } from './entities/categories/categories.module.ts';
import { Community } from './entities/communities/community.entity.ts';
import { CommunitiesModule } from './entities/communities/communities.module.ts';
import { Language } from './entities/langueges/language.entity.ts';
import { LanguagesModule } from './entities/langueges/languages.module.ts';
import { User } from './entities/users/user.entity.ts';
import { UsersModule } from './entities/users/users.module.ts';

@Module({
  imports: [
    AgeGroupsModule,
    ArticlesModule,
    AudiencesModule,
    AuthModule,
    CategoriesModule,
    CommunitiesModule,
    ConfigModule.forRoot({
      load: [configuration],
      ignoreEnvFile: true,
      cache: true,
      isGlobal: true,
    }),
    LanguagesModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {return ({
        type: 'postgres',
        url: config.get<string>('database.url'),
        entities: [AgeGroup, Article, Audience, Category, Community, Language, User],
        synchronize: process.env.NODE_ENV !== 'production',
      })},
    }),
    UsersModule,
  ],
})
export class AppModule {}
