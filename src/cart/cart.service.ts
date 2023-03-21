import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Cart } from './models/cart.model';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart) private cartRepo: typeof Cart
  ) {}
   async create(createCartDto: CreateCartDto) {
    const newUserWallet = await this.cartRepo.create(createCartDto)
    return newUserWallet;
  }

  async findAll() {
    const userWallets = await this.cartRepo.findAll({include:{all: true}})
    return userWallets
  }

  async remove(id: number) {
    const userWallet = await this.cartRepo.destroy({where: {id}});

    if(!userWallet){
      throw new HttpException('userWalletRepo yuq', HttpStatus.NOT_FOUND)
    }
    return {message: 'userWalletRepo uchirildi'}
  }
}
