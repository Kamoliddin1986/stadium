import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ComfortService } from './comfort.service';
import { CreateComfortDto } from './dto/create-comfort.dto';
import { UpdateComfortDto } from './dto/update-comfort.dto';
import { isActiveGuard } from '../guard/isActive.guard';

@Controller('comfort')
export class ComfortController {
  constructor(private readonly comfortService: ComfortService) {}


  @UseGuards(isActiveGuard)
  @Post()
  create(@Body() createComfortDto: CreateComfortDto) {
    return this.comfortService.create(createComfortDto);
  }


  @UseGuards(isActiveGuard)
  @Get()
  findAll() {
    return this.comfortService.findAll();
  }



  @UseGuards(isActiveGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comfortService.remove(+id);
  }
}
