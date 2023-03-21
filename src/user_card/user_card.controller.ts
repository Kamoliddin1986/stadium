import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserCardService } from './user_card.service';
import { CreateUserCardDto } from './dto/create-user_card.dto';
import { UpdateUserCardDto } from './dto/update-user_card.dto';
import { isActiveGuard } from '../guard/isActive.guard';

@Controller('user-card')
export class UserCardController {
  constructor(private readonly userCardService: UserCardService) {}
  @UseGuards(isActiveGuard)
  @Post('create')
  create(@Body() createUserCardDto: CreateUserCardDto) {
    return this.userCardService.create(createUserCardDto);
  }
  @UseGuards(isActiveGuard)
  @Get()
  findAll() {
    return this.userCardService.findAll();
  }

  @UseGuards(isActiveGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userCardService.remove(+id);
  }
}
