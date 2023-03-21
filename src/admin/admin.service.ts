
import { Response } from 'express';
import { HttpException, HttpStatus, Injectable, BadRequestException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './models/admin.model';
import {v4 as uuidv4, v4 } from 'uuid';

import * as bcrypt from 'bcrypt'
import { MailersService } from '../mailer/mailer.service';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin) private adminRepo: typeof Admin,
    private readonly jwtService: JwtService,private readonly mailersService: MailersService
  ) {}
   async create(createAdminDto: CreateAdminDto) {
    const newAdmin = await this.adminRepo.create(createAdminDto)
    return newAdmin;
  }

  async findAll() {
    const regions = await this.adminRepo.findAll({include:{all: true}})
    return regions
  }

  async remove(id: number) {
    const admin = await this.adminRepo.destroy({where: {id}});

    if(!admin){
      throw new HttpException('admin yuq', HttpStatus.NOT_FOUND)
    }
    return {message: 'Admin uchirildi'}
  }

  async registration(createAdminDto: CreateAdminDto, res: Response) {

    
    const admin = await this.adminRepo.findOne({
      where: {username: createAdminDto.username}
    })

    if(admin) {
      throw new BadRequestException('Admin is axists')
    }

    if(createAdminDto.password !== createAdminDto.confirm_password) {
      throw new BadRequestException('Password is not correct');
    }

    const hashed_password = await bcrypt.hash(createAdminDto.password,7);
    const newAdmin = await this.adminRepo.create({
      ...createAdminDto,
      hashed_password: hashed_password
    })

    const token = await this.getToken(newAdmin)

    const hashed_refresh_token = await bcrypt.hash(token.refresh_token, 7)

    const uniquiKey: string= uuidv4();


    const updateAdmin = await this.adminRepo.update({
      hashed_refresh_token: hashed_refresh_token,
      activation_link: uniquiKey
    }, {
      where: {id: newAdmin.id}, returning: true
    })

    res.cookie('refresh_token', token.refresh_token,
    {
      maxAge: 15*24*60*60*1000,
      httpOnly: true
    })

    
    await this.mailersService.sendAdminConfirmation(updateAdmin[1][0])
    const response = {
      message: 'Admin registered',
      user: updateAdmin[1][0],
      token
    }

    return response
    
  }
  async getToken(admin: Admin) {
    const jwtPayload = {
      id: admin.id,
      is_active: admin.is_active,
      is_creater: admin.is_creater
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME
      })  
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken
    }

  }
  
}
