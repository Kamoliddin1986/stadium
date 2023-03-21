import { SequelizeModule } from '@nestjs/sequelize';
import { Module, forwardRef } from '@nestjs/common';


import { Stadium } from '../stadiums/models/stadium.model';

import { Comfort } from '../comfort/models/comfort.model';
import { ComfortStadiumService } from './comfort-stadium.service';
import { ComfortStadiumController } from './comfort-stadium.controller';
import { ComfortStadium } from './model/comfort-stadium.model';

@Module({
  imports: [SequelizeModule.forFeature([Comfort,Stadium,ComfortStadium])],
  controllers: [ComfortStadiumController],
  providers: [ComfortStadiumService],

})
export class ComfortStadiumModule {}