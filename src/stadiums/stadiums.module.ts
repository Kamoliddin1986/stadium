import { SequelizeModule } from '@nestjs/sequelize';
import { Module, forwardRef } from '@nestjs/common';
import { StadiumsService } from './stadiums.service';
import { StadiumsController } from './stadiums.controller';
import { Media } from '../media/models/media.model';
import { District } from '../district/models/district.model';
import { Region } from '../region/models/region.model';

import { Comfort } from '../comfort/models/comfort.model';
import { Category } from '../categories/models/category.model';
import { User } from '../users/models/user.model';
import { Comment } from '../comments/models/comment.model';
import { StadiumTime } from '../stadium_times/models/stadium_time.model';
import { ComfortModule } from '../comfort/comfort.module';
import { ComfortService } from '../comfort/comfort.service';
import { Stadium } from './models/stadium.model';
import { ComfortStadium } from '../comfort-stadium/model/comfort-stadium.model';

@Module({
  imports: [SequelizeModule.forFeature([
    Media,
    District,
    Region,
    ComfortStadium,
    Comfort,
    Category,
    User,
    Comment,
    StadiumTime,
    Stadium
  ]),
  ComfortModule
],
  controllers: [StadiumsController],
  providers: [StadiumsService,ComfortService]
})
export class StadiumsModule {}
