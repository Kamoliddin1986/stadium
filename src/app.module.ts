


import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';

import {SequelizeModule} from '@nestjs/sequelize'
import { CategoriesModule } from './categories/categories.module';
import { StadiumsModule } from './stadiums/stadiums.module';
import { UsersModule } from './users/users.module';
import { RegionModule } from './region/region.module';
import { DistrictModule } from './district/district.module';
import { MediaModule } from './media/media.module';
import { ComfortModule } from './comfort/comfort.module';
import { UserCardModule } from './user_card/user_card.module';
import { CommentsModule } from './comments/comments.module';
import { CartModule } from './cart/cart.module';
import { StadiumTimesModule } from './stadium_times/stadium_times.module';
import { OrdersModule } from './orders/orders.module';
import { UserWalletModule } from './user_wallet/user_wallet.module';
import { UserWallet } from './user_wallet/models/user_wallet.model';
import { Order } from './orders/models/order.model';
import { User } from './users/models/user.model';
import { Stadium } from './stadiums/models/stadium.model';
import { Comment } from './comments/models/comment.model';
import { UserCard } from './user_card/models/user_card.model';
import { Category } from './categories/models/category.model';
import { Region } from './region/models/region.model';
import { District } from './district/models/district.model';
import { Media } from './media/models/media.model';

import { Comfort } from './comfort/models/comfort.model';
import { StadiumTime } from './stadium_times/models/stadium_time.model';
import { Cart } from './cart/models/cart.model';
import { ComfortStadium } from './comfort-stadium/model/comfort-stadium.model';
import { ComfortStadiumModule } from './comfort-stadium/comfort-stdium.module';
import { MailModule } from './mail/mail.module';
import { AdminModule } from './admin/admin.module';

import { MailersModule } from './mailer/mailer.module';
import { MailersService } from './mailer/mailer.service';
import { Admin } from './admin/models/admin.model';
import { BotModule } from './bot/bot.module';
import { TelegrafModule } from 'nestjs-telegraf';
import { BOT_NAME } from './app.constants'
import { Bot } from './bot/models/bot.model';
import { OtpModule } from './otp/otp.module';






@Module({
    imports: [
        TelegrafModule.forRootAsync({
            botName: BOT_NAME,
            useFactory: () => ({
                token: process.env.BOT_TOKEN,
                middlewares: [],
                include: [BotModule]
            })
        }),
        ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true}),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: String(process.env.POSTGRES_PASSWORD),
            database: process.env.POSTGRES_DB,
            models: [
                User, 
                Comment, 
                Stadium,
                UserWallet,
                Order,
                UserCard,
                Category,
                Region,
                District,
                Media,
                ComfortStadium,
                Comfort,
                StadiumTime,
                Cart,Admin,
                Bot
            ],
            autoLoadModels: true,
            logging: true
        }),
        ComfortStadiumModule,
        CategoriesModule,        
        StadiumsModule,
        UsersModule,
        RegionModule,
        DistrictModule,
        MediaModule,
        ComfortModule,
        UserCardModule,
        CommentsModule,
        CartModule,
        StadiumTimesModule,
        OrdersModule,
        UserWalletModule,
        UserWallet,
        Order,
        MailModule,
        AdminModule,
        MailersModule,
        BotModule,
        OtpModule],

    providers: [MailersService],
    exports: []
})
export class AppModule {}
