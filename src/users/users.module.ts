import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './models/user.model';
import { Comment } from '../comments/models/comment.model';
import { Stadium } from '../stadiums/models/stadium.model';
import { UserWallet } from '../user_wallet/models/user_wallet.model';
import { UserCard } from '../user_card/models/user_card.model';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from '../mail/mail.module';
import { Otp } from '../otp/models/otp.model';
import { OtpModule } from '../otp/otp.module';
import { BotModule } from '../bot/bot.module';

@Module({
  imports: [SequelizeModule.forFeature([User, Comment, Stadium, UserWallet, Otp]),
  JwtModule.register({}), MailModule, OtpModule,BotModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, JwtModule]
})
export class UsersModule {}
