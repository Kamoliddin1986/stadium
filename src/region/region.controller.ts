import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RegionService } from './region.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { isActiveGuard } from '../guard/isActive.guard';

@Controller('region')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

    @UseGuards(isActiveGuard)
  @Post()
  create(@Body() createRegionDto: CreateRegionDto) {
    return this.regionService.create(createRegionDto);
  }

    @UseGuards(isActiveGuard)
  @Get()
  findAll() {
    return this.regionService.findAll();
  }



    @UseGuards(isActiveGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.regionService.remove(+id);
  }
}
