import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { sequenceEqual } from 'rxjs';
import { Comment } from './models/comment.model';
import { User } from '../users/models/user.model';
import { Stadium } from '../stadiums/models/stadium.model';

@Module({
  imports: [SequelizeModule.forFeature([Comment,User, Stadium])],
  controllers: [CommentsController],
  providers: [CommentsService]
})
export class CommentsModule {}
