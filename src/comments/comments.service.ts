import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from './models/comment.model';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment) private commentRepo: typeof Comment
  ) {}
   async create(createCommentDto: CreateCommentDto) {
    const newComment = await this.commentRepo.create(createCommentDto)
    return newComment;
  }

  async findAll() {
    const comments = await this.commentRepo.findAll({include:{all: true}})
    return comments
  }

  async remove(id: number) {
    const comment = await this.commentRepo.destroy({where: {id}});

    if(!comment){
      throw new HttpException('Comment yuq', HttpStatus.NOT_FOUND)
    }
    return {message: 'Comment uchirildi'}
  }
}
