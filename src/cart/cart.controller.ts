import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { isActiveGuard } from '../guard/isActive.guard';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}
@UseGuards(isActiveGuard)
  @Post()
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartService.create(createCartDto);
  }
@UseGuards(isActiveGuard)
  @Get()
  findAll() {
    return this.cartService.findAll();
  }

@UseGuards(isActiveGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(+id);
  }
}
