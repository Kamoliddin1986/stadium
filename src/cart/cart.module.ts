import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { Cart } from './models/cart.model';

import { UserCard } from '../user_card/models/user_card.model';
import { StadiumTime } from '../stadium_times/models/stadium_time.model';
import { UserWallet } from '../user_wallet/models/user_wallet.model';

@Module({
  imports: [SequelizeModule.forFeature([Cart,UserCard,StadiumTime,UserWallet])],
  controllers: [CartController],
  providers: [CartService]
})
export class CartModule {}
