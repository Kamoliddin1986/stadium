import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { StadiumsService } from './stadiums.service';
import { CreateStadiumDto } from './dto/create-stadium.dto';
import { UpdateStadiumDto } from './dto/update-stadium.dto';
import { SetComfortDto } from './dto/set-comfort.dto';
import { isOwnerGuard } from '../guard/isOwner.guard';
import { isActiveGuard } from '../guard/isActive.guard';

@Controller('stadiums')
export class StadiumsController {
  constructor(private readonly stadiumsService: StadiumsService) {}


  @UseGuards(isOwnerGuard)
  @Post()
  create(@Body() createStadiumDto: CreateStadiumDto) {
    return this.stadiumsService.create(createStadiumDto);
  }

  @Get()
  findAll() {
    return this.stadiumsService.findAll();
  }


  @UseGuards(isOwnerGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stadiumsService.remove(+id);
  }

  
}
