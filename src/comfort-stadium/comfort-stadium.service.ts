import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/sequelize';
import { ComfortStadium } from './model/comfort-stadium.model';
import { CreateComfortStadiumDto } from './dto/create.comfort-stadium.dto';


@Injectable()
export class ComfortStadiumService {


  constructor(
    @InjectModel(ComfortStadium) private comfortStadiumRepo: typeof ComfortStadium
  ) {}
   async create(createComfortStadiumDto: CreateComfortStadiumDto) {
    const newComfort = await this.comfortStadiumRepo.create(createComfortStadiumDto)
    return newComfort;
  }

  async findAll() {
    const comfortStadiums = await this.comfortStadiumRepo.findAll({include:{all: true}})
    return comfortStadiums
  }

  async remove(id: number) {
    const comfortStadium = await this.comfortStadiumRepo.destroy({where: {id}});

    if(!comfortStadium){
      throw new HttpException('Comfort Stadium yuq', HttpStatus.NOT_FOUND)
    }
    return {message: 'comfortStadium uchirildi'}
  }


  
}
