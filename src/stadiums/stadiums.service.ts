import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStadiumDto } from './dto/create-stadium.dto';
import { UpdateStadiumDto } from './dto/update-stadium.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Stadium } from './models/stadium.model';
import { ComfortService } from '../comfort/comfort.service';
import { SetComfortDto } from './dto/set-comfort.dto';

@Injectable()
export class StadiumsService {
  constructor(
    @InjectModel(Stadium) private stadiumRepo: typeof Stadium,
    private readonly comfortService: ComfortService
  ){}
   async create(createStadiumDto: CreateStadiumDto) {
  
    
     const newStadium = await this.stadiumRepo.create(createStadiumDto)
    

    return newStadium
  }

  async findAll() {
    const stadiums = await this.stadiumRepo.findAll({include:{all: true}})
    return stadiums
  }

  async remove(id: number) {
    const stadium = await this.stadiumRepo.destroy({where: {id}});

    if(!stadium){
      throw new HttpException('Stadium yuq', HttpStatus.NOT_FOUND)
    }
    return {message: 'Stadium uchirildi'}
  }

 

}
