import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { StadiumTimesService } from './stadium_times.service';
import { CreateStadiumTimeDto } from './dto/create-stadium_time.dto';
import { UpdateStadiumTimeDto } from './dto/update-stadium_time.dto';
import { isActiveGuard } from '../guard/isActive.guard';

@Controller('stadium-times')
export class StadiumTimesController {
  constructor(private readonly stadiumTimesService: StadiumTimesService) {}

    @UseGuards(isActiveGuard)
  @Post()
  create(@Body() createStadiumTimeDto: CreateStadiumTimeDto) {
    return this.stadiumTimesService.create(createStadiumTimeDto);
  }

    @UseGuards(isActiveGuard)
  @Get()
  findAll() {
    return this.stadiumTimesService.findAll();
  }



    @UseGuards(isActiveGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stadiumTimesService.remove(+id);
  }
}
