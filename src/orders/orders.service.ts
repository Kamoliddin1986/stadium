import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './models/order.model';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order) private orderRepo: typeof Order
  ) {}
   async create(createOrderDto: CreateOrderDto) {
    const newOrder = await this.orderRepo.create(createOrderDto)
    return newOrder
   }
  async findAll() {
    const orders = await this.orderRepo.findAll({include:{all: true}})
    return orders
  }

  async remove(id: number) {
    const order = await this.orderRepo.destroy({where: {id}});

    if(!order){
      throw new HttpException('Comment yuq', HttpStatus.NOT_FOUND)
    }
    return {message: 'order uchirildi'}
  }
}
