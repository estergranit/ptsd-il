import { Module } from '@nestjs/common';
import { AgeGroupsModule } from '../age-groups/age-groups.module.ts';
import { ArticlesModule } from '../articles/articles.module.ts';
import { AudiencesModule } from '../audiences/audiences.module.ts';
import { CategoriesModule } from '../categories/categories.module.ts';
import { CommunitiesModule } from '../communities/communities.module.ts';
import { LanguagesModule } from '../langueges/languages.module.ts';
import { UsersModule } from '../users/users.module.ts';
import { AdminAgeGroupsController } from './admin-age-groups.controller.ts';
import { AdminArticlesController } from './admin-articles.controller.ts';
import { AdminAudiencesController } from './admin-audiences.controller.ts';
import { AdminCategoriesController } from './admin-categories.controller.ts';
import { AdminCommunitiesController } from './admin-communities.controller.ts';
import { AdminLanguagesController } from './admin-languages.controller.ts';
import { AdminUsersController } from './admin-users.controller.ts';

@Module({
  imports: [
    AgeGroupsModule,
    ArticlesModule,
    AudiencesModule,
    CategoriesModule,
    CommunitiesModule,
    LanguagesModule,
    UsersModule,
  ],
  controllers: [
    AdminAgeGroupsController,
    AdminArticlesController,
    AdminAudiencesController,
    AdminCategoriesController,
    AdminCommunitiesController,
    AdminLanguagesController,
    AdminUsersController,
  ],
})
export class AdminModule {}
