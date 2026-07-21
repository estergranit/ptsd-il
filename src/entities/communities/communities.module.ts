import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Audience } from '../audiences/audiences.entity.ts';
import { Community } from './community.entity.ts';
import { CommunitiesController } from './communities.controller.ts';
import { CommunitiesService } from './communities.service.ts';

@Module({
  imports: [TypeOrmModule.forFeature([Community, Audience])],
  controllers: [CommunitiesController],
  providers: [CommunitiesService],
  exports: [CommunitiesService],
})
export class CommunitiesModule {}
