import { SequelizeModule } from '@nestjs/sequelize';
import { sequenceEqual } from 'rxjs';
import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { Admin } from './models/admin.model';
import { UsersModule } from '../users/users.module';
import { MailersModule } from '../mailer/mailer.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Admin]), MailersModule,JwtModule.register({})],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}
