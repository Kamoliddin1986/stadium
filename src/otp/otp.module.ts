import { Otp } from './models/otp.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { OtpController } from './otp.controller';

@Module({
  imports: [SequelizeModule.forFeature([Otp])],
  controllers: [OtpController],
  providers: [OtpService]
})
export class OtpModule {}
