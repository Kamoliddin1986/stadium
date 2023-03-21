import { Region } from '../region/models/region.model';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class RegionService {
  constructor(
    @InjectModel(Region) private regionRepo: typeof Region
  ) {}
   async create(createRegionDto: CreateRegionDto) {
    const newRegion = await this.regionRepo.create(createRegionDto)
    return newRegion;
  }

  async findAll() {
    const regions = await this.regionRepo.findAll({include:{all: true}})
    return regions
  }

  async remove(id: number) {
    const region = await this.regionRepo.destroy({where: {id}});

    if(!region){
      throw new HttpException('Region yuq', HttpStatus.NOT_FOUND)
    }
    return {message: 'User uchirildi'}
  }
}
