import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { RegionService } from './region.service';
import { RegionController } from './region.controller';
import { Region } from './models/region.model';
import { District } from '../district/models/district.model';
import { Stadium } from '../stadiums/models/stadium.model';

@Module({
  imports: [SequelizeModule.forFeature([Region, District, Stadium])],
  controllers: [RegionController],
  providers: [RegionService]
})
export class RegionModule {}
