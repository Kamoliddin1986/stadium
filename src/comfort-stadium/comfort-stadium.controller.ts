import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';

import { ComfortStadiumService } from './comfort-stadium.service';
import { CreateComfortStadiumDto } from './dto/create.comfort-stadium.dto';
import { isActiveGuard } from '../guard/isActive.guard';

@Controller('comfort-stadium')
export class ComfortStadiumController {
  constructor(private readonly comfortStadiumService: ComfortStadiumService) {}

  @UseGuards(isActiveGuard)
  @Post()
  create(@Body() createComfortDto: CreateComfortStadiumDto) {
    return this.comfortStadiumService.create(createComfortDto);
  }

  @UseGuards(isActiveGuard)
  @Get()
  findAll() {
    return this.comfortStadiumService.findAll();
  }


  @UseGuards(isActiveGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comfortStadiumService.remove(+id);
  }
}
