import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { StadiumTimesService } from './stadium_times.service';
import { StadiumTimesController } from './stadium_times.controller';
import { StadiumTime } from './models/stadium_time.model';
import { Cart } from '../cart/models/cart.model';
import { Stadium } from '../stadiums/models/stadium.model';
import { Order } from '../orders/models/order.model';

@Module({
  imports: [ SequelizeModule.forFeature([StadiumTime,Cart,Stadium,Order])],
  controllers: [StadiumTimesController],
  providers: [StadiumTimesService]
})
export class StadiumTimesModule {}
