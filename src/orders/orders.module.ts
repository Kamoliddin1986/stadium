import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { StadiumTime } from '../stadium_times/models/stadium_time.model';
import { Order } from './models/order.model';
import { UserWallet } from '../user_wallet/models/user_wallet.model';

@Module({
  imports: [SequelizeModule.forFeature([StadiumTime, Order, UserWallet])],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule {}
