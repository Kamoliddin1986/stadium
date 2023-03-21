import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { Stadium } from '../stadiums/models/stadium.model';
import { Media } from './models/media.model';

@Module({
  imports: [SequelizeModule.forFeature([Stadium,Media])],
  controllers: [MediaController],
  providers: [MediaService]
})
export class MediaModule {}
