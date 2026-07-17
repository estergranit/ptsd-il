import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Audience } from './audiences.entity.ts';
import { AudiencesController } from './audiences.controller.ts';
import { AudiencesService } from './audiences.service.ts';

@Module({
  imports: [TypeOrmModule.forFeature([Audience])],
  controllers: [AudiencesController],
  providers: [AudiencesService],
  exports: [AudiencesService],
})
export class AudiencesModule {}
