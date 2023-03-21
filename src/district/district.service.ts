import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { InjectModel } from '@nestjs/sequelize';
import { District } from './models/district.model';

@Injectable()
export class DistrictService {
  constructor(
    @InjectModel(District) private districtRepo: typeof District
  ) {}
   async create(createDistrictDto: CreateDistrictDto) {
    const newDistrict = await this.districtRepo.create(createDistrictDto)
    return newDistrict;
  }

  async findAll() {
    const districts = await this.districtRepo.findAll({include:{all: true}})
    return districts
  }

  async remove(id: number) {
    const district = await this.districtRepo.destroy({where: {id}});

    if(!district){
      throw new HttpException('District yuq', HttpStatus.NOT_FOUND)
    }
    return {message: 'District uchirildi'}
  }

}
