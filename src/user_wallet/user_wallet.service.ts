import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserWalletDto } from './dto/create-user_wallet.dto';
import { UpdateUserWalletDto } from './dto/update-user_wallet.dto';
import { InjectModel } from '@nestjs/sequelize';
import { UserWallet } from './models/user_wallet.model';

@Injectable()
export class UserWalletService {
  constructor(
    @InjectModel(UserWallet) private userWalletRepo: typeof UserWallet
  ) {}
   async create(createUserWalletDto: CreateUserWalletDto) {
    const newUserWallet = await this.userWalletRepo.create(createUserWalletDto)
    return newUserWallet;
  }

  async findAll() {
    const userWallets = await this.userWalletRepo.findAll({include:{all: true}})
    return userWallets
  }

  async remove(id: number) {
    const userWallet = await this.userWalletRepo.destroy({where: {id}});

    if(!userWallet){
      throw new HttpException('userWalletRepo yuq', HttpStatus.NOT_FOUND)
    }
    return {message: 'userWalletRepo uchirildi'}
  }
}
