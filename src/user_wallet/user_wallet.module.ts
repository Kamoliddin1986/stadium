import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { UserWalletService } from './user_wallet.service';
import { UserWalletController } from './user_wallet.controller';
import { Order } from '../orders/models/order.model';
import { UserWallet } from './models/user_wallet.model';
import { User } from '../users/models/user.model';

@Module({
  imports: [SequelizeModule.forFeature([Order,UserWallet,User])],
  controllers: [UserWalletController],
  providers: [UserWalletService]
})
export class UserWalletModule {}
