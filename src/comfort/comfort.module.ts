import { SequelizeModule } from '@nestjs/sequelize';
import { Module, forwardRef } from '@nestjs/common';
import { ComfortService } from './comfort.service';
import { ComfortController } from './comfort.controller';
import { Comfort } from './models/comfort.model';
import { Stadium } from '../stadiums/models/stadium.model';

import { StadiumsService } from '../stadiums/stadiums.service';
import { StadiumsModule } from '../stadiums/stadiums.module';
import { ComfortStadium } from '../comfort-stadium/model/comfort-stadium.model';

@Module({
  imports: [SequelizeModule.forFeature([Comfort,Stadium,ComfortStadium])],
  controllers: [ComfortController],
  providers: [ComfortService],
  exports: [ComfortService]
})
export class ComfortModule {}
