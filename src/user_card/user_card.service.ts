import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserCardDto } from './dto/create-user_card.dto';
import { UpdateUserCardDto } from './dto/update-user_card.dto';
import { UserCard } from './models/user_card.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UserCardService {
  constructor(
    @InjectModel(UserCard) private userCardRepo: typeof UserCard
  ) {}
   async create(createUserCardDto: CreateUserCardDto) {
    const newUser = await this.userCardRepo.create(createUserCardDto)
    return newUser;
  }

  async findAll() {
    const users = await this.userCardRepo.findAll({include:{all: true}})
    return users
  }

  async remove(id: number) {
    const user = await this.userCardRepo.destroy({where: {id}});

    if(!user){
      throw new HttpException('Foydalanuvchi yuq', HttpStatus.NOT_FOUND)
    }
    return {message: 'User uchirildi'}
  }
}
