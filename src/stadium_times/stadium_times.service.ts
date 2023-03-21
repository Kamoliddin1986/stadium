import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStadiumTimeDto } from './dto/create-stadium_time.dto';
import { UpdateStadiumTimeDto } from './dto/update-stadium_time.dto';
import { StadiumTime } from './models/stadium_time.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class StadiumTimesService {
  constructor(
    @InjectModel(StadiumTime) private stadiumTimeRepo: typeof StadiumTime
  ) {}
   async create(createStadiumTimeDto: CreateStadiumTimeDto) {
    const newStadiumTime = await this.stadiumTimeRepo.create(createStadiumTimeDto)
    return newStadiumTime;
  }

  async findAll() {
    const stadiumTimes = await this.stadiumTimeRepo.findAll({include:{all: true}})
    return stadiumTimes
  }

  async remove(id: number) {
    const stadiumTimes = await this.stadiumTimeRepo.destroy({where: {id}});

    if(!stadiumTimes){
      throw new HttpException('stadiumTimes yuq', HttpStatus.NOT_FOUND)
    }
    return {message: 'stadiumTimes uchirildi'}
  }
}
