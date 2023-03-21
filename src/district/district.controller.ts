import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DistrictService } from './district.service';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { isActiveGuard } from '../guard/isActive.guard';

@Controller('district')
export class DistrictController {
  constructor(private readonly districtService: DistrictService) {}


  @UseGuards(isActiveGuard)
  @Post()
  create(@Body() createDistrictDto: CreateDistrictDto) {
    return this.districtService.create(createDistrictDto);
  }


  @UseGuards(isActiveGuard)
  @Get()
  findAll() {
    return this.districtService.findAll();
  }



  @UseGuards(isActiveGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.districtService.remove(+id);
  }
}
