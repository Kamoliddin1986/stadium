import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { UserCardService } from './user_card.service';
import { UserCardController } from './user_card.controller';
import { UserCard } from './models/user_card.model';
import { User } from '../users/models/user.model';
import { Cart } from '../cart/models/cart.model';

@Module({
  imports: [SequelizeModule.forFeature([UserCard,User,Cart])],
  controllers: [UserCardController],
  providers: [UserCardService]
})
export class UserCardModule {}
