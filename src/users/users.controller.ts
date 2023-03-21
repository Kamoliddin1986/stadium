import { FindUserDto } from './dto/findUser.dto';
import { VerifyOtpDto } from './dto/verifyOtp.dto';
import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {Response} from 'express'
import { LoginUserDto } from './dto/login-user.dto';
import { CookieGetter } from '../decorators/cookieGetter.decorator';
import { PhoneUserDto } from './dto/phone-user.dto';
import { isOwnerGuard } from '../guard/isOwner.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  registration(
    @Body() createUserDto: CreateUserDto,
    @Res({passthrough: true}) res: Response,
  ) {
    return this.usersService.registration(createUserDto, res);
  }


  @Post('signin')
  login(
    @Body() loginUserDto: LoginUserDto,
    @Res({passthrough: true}) res: Response,
  ) {
    return this.usersService.login(loginUserDto, res);
  }

  @Post('/otp')
  newOtp(
    @Body() phoneUserDto: PhoneUserDto
  ) {
    return this.usersService.newOtp(phoneUserDto);
  }

  @Post('/verify')
  verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    return this.usersService.verifyOtp(verifyOtpDto)
  }


  @Post('signout')
  logout(
    @CookieGetter('refresh_token') refresh_token: string,
    @Res({passthrough: true}) res: Response
  ) {
    return this.usersService.logout(refresh_token, res);
  }



  // @Post('create')
  // create(@Body() createUserDto: CreateUserDto) {

    
  //   return this.usersService.create(createUserDto);
  // }

  // @Get('all')
  // findAll() {
  //   return this.usersService.findAll();
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Get('activate/:link')
  activate(@Param('link') link: string) {
    return this.usersService.activate(link)
  }
  @Post(':id/refresh')
  refresh(
    @Param('id') id: string,
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({passthrough: true}) res: Response
  ){
    return this.usersService.refreshToken(+id,refreshToken,res)
  }

  @Post('find')
  findAllbyFilter(@Body() findUserDto: FindUserDto) {
    return this.usersService.findAllbyFilter(findUserDto)
  }
  
 

  
}
