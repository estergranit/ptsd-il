import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgeGroup } from './age-group.entity.ts';
import { AgeGroupsService } from './age-groups.service.ts';
import { AgeGroupsController } from './age-groups.controller.ts';

@Module({
  imports: [TypeOrmModule.forFeature([AgeGroup])],
  controllers: [AgeGroupsController],
  providers: [AgeGroupsService],
  exports: [AgeGroupsService],
})
export class AgeGroupsModule {}
