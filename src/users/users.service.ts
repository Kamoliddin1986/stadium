import { FindUserDto } from './dto/findUser.dto';
import { dates } from './../helpers/crypto';
import { VerifyOtpDto } from './dto/verifyOtp.dto';
import { BotService } from './../bot/bot.service';
import { PhoneUserDto } from './dto/phone-user.dto';
import { IsStrongPassword } from 'class-validator';
import { LoginUserDto } from './dto/login-user.dto';
import { Injectable, BadRequestException, ForbiddenException, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import * as bcrypt from 'bcrypt'
import {v4 as uuidv4, v4 } from 'uuid'
import { MailService } from '../mail/mail.service';

import * as otpGenerator from 'otp-generator'
import { Op } from 'sequelize';
import { Otp } from '../otp/models/otp.model';
import { AddMinutesToDate } from '../helpers/addMinutes';
import { encode, decode } from '../helpers/crypto';


@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User) private readonly userRepo: typeof User,
    @InjectModel(Otp) private readonly otpRepo: typeof Otp,
    private readonly jwtServise: JwtService, private readonly mailService: MailService,
    private readonly botService: BotService
  ) {}

  async registration(createUserDto: CreateUserDto, res: Response) {
    const user = await this.userRepo.findOne({
      where: {username: createUserDto.username}
    })

    if(user) {
      throw new BadRequestException('User is exists');
    }

    if(createUserDto.password !== createUserDto.confirm_password) {
      throw new BadRequestException('Password is not match!');
    }

    const hashed_password = await bcrypt.hash(createUserDto.password,7);
    const newUser = await this.userRepo.create({
      ...createUserDto,
      hashed_password: hashed_password
    })

    console.log('ser>>>>>>>>>>>>..');
    const tokens = await this.getToken(newUser)

    
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7)
    const uniqueKey: string = uuidv4();

    const updateUser = await this.userRepo.update({
      hashed_refresh_token: hashed_refresh_token,
      activation_link: uniqueKey
    },
    {
      where: {id: newUser.id}, returning: true
    })

    let msg = 'User registrated'  

    await this.mailService.sendUserConfirmation(updateUser[1][0])
    return await this.cookie(tokens,msg,updateUser,res)  

  }

  async findOne(id: number) {
    const user = await this.userRepo.findOne({where: {id}})
    return  user
  }


  async cookie(tokens: any, msg: string, update: any, res: Response ) {
    res.cookie('refresh_token', `${tokens.refresh_token}`, {
      maxAge: 15*24*60*60*1000,
      httpOnly: true
    })

  const response = {
    message: msg,
    user: update[1][0],
    tokens,
  };
  return response
  }

  

  async getToken(user: User) {
    const jwtPayload = {
      id: user.id,
      is_activa: user.is_active,
      is_owner: user.is_owner
    };

    const [accessToken, refreshToken] =await Promise.all([
      this.jwtServise.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME
      }),
      this.jwtServise.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME
      })
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken
    }
  }



  async login(loginUserDto: LoginUserDto, res: Response) {
    const {email, password} = loginUserDto;
    const user = await this.userRepo.findOne({ where: {email}});
    if(!user) {
      throw new BadRequestException('User not registered!!');
    }


    const isMatchPass = await bcrypt.compare(password, user.hashed_password)
    if(!isMatchPass) {
      throw new BadRequestException('User not registered(pass)!!');
    }

    const tokens = await this.getToken(user)

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token,7)

    const updateUser = await this.userRepo.update({
      hashed_refresh_token: hashed_refresh_token},
     {where: {id: user.id}, returning: true}
    ) 

   
    let msg = 'User signed in'
   
  
    return await this.cookie(tokens,msg,updateUser,res) 
  }
  

  async logout (refreshToken: string, res: Response) {

    const userData = await this.jwtServise.verify(refreshToken,{
      secret: process.env.REFRESH_TOKEN_KEY
    })

    if(!userData){
      throw new ForbiddenException("User not founded")
    }

    const updateUser = await this.userRepo.update(
      {hashed_refresh_token: null},
      {where: {id:userData.id}, returning: true})

    res.clearCookie('refresh_token');
      const response = {
        message: 'Logout successfull',
        user: updateUser[1][0]
      }

      return response
  }


  async findAllbyFilter(findUserDto: FindUserDto) {
    const where = {};
    if(findUserDto.first_name) {
      where['first_name'] = {
        [Op.like]: `%${findUserDto.first_name}%`,
      }
    }
    if(findUserDto.last_name) {
      where['last_name'] = {
        [Op.like]: `%${findUserDto.last_name}%`,
      }
    }
    if(findUserDto.username) {
      where['username'] = {
        [Op.like]: `%${findUserDto.username}`
      }
    }
    if(findUserDto.email) {
      where['email'] = {
        [Op.like]: `%${findUserDto.email}`
      }
    }

    if(findUserDto.phone) {
      where['phone'] = {
        [Op.like]: `%${findUserDto.phone}`
      }
    }

    if(findUserDto.birthday_start) {
      if(findUserDto.birthday_end){
        where['birthday'] = {
          [Op.between]: [`%${findUserDto.birthday_start}`,`%${findUserDto.birthday_end}`]
        }
      }else{
        where['birthday'] = {
          [Op.gt]: `%${findUserDto.birthday_start}`
        }
      }

    if(findUserDto.birthday_end) {     
        where['birthday'] = {
          [Op.lt]: `%${findUserDto.birthday_end}`
        }
      }
    }
    
    const users = await this.userRepo.findAll({where})
    return users
  }

  async remove(id: number) {
    const user = await this.userRepo.destroy({where: {id}});

    if(!user){
      throw new HttpException('Foydalanuvchi yuq', HttpStatus.NOT_FOUND)
    }
    return {message: 'User uchirildi'}
  }


  async activate(link: string) {

    if(!link){
      throw new BadRequestException("Activation link not foudeded!")
    }
    const updatedUser = await this.userRepo.update(
      {is_active: true},
      { where: {activation_link: link, is_active: false}, returning: true}
    )

    if(!updatedUser[1][0]){
      throw new BadRequestException('User also activated')
    }

    const response = {
      message: 'User activated successful',
      user: updatedUser
    }
    return response;
  }


  async refreshToken(user_id: number, refreshToken: string, res: Response) {
    const decodedToken = this.jwtServise.decode(refreshToken);

    if(user_id != decodedToken['id']) {
      throw new BadRequestException('user not founded');
    }

    const user = await this.userRepo.findOne({ where: { id: user_id}})
    if(!user || !user.hashed_refresh_token){
      throw new BadRequestException('User not founded')
    }

    const tokenMatch = await bcrypt.compare(
      refreshToken,
      user.hashed_refresh_token
    )

    if (!tokenMatch) {
      throw new BadRequestException("Taqaialngan")
    }

    const tokens = await this.getToken(user);

  }


  async newOtp(phoneUserDto: PhoneUserDto){
    const phone_number = phoneUserDto.phone;

    const otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false
    });
    const isSend = await this.botService.sendOTP(phone_number, otp);
    if(!isSend){
      throw new HttpException(
        "Avval BOtdan ro`yxatdan o'ting",
        HttpStatus.BAD_REQUEST,
      );
    }

    const now = new Date();
    const expiration_time = AddMinutesToDate(now,5);
    
    
    await this.otpRepo.destroy({
      where: {check: phone_number}
    })
    const newOtp = await this.otpRepo.create({
      id: v4(),
      otp,
      expiretion_time: expiration_time,
      check: phone_number
    });

    const details = {
      timestamp: now,
      check: phone_number,
      success: true,
      message: 'Otp send to user',
      otp_id: newOtp.id,
    }

    const encoded = await encode(JSON.stringify(details));
    return { status: 'Success', Details: encoded}

    
  }

  async verifyOtp(verifyOtpDto: VerifyOtpDto) {
    const { verification_key, otp, check} = verifyOtpDto
    const currentdate = new Date();
    const decod = await decode(verification_key);
    const obj = JSON.parse(decod);
    const check_obj = obj.check
    if(check_obj !=check) {
      throw new BadRequestException('OTP bu raqamga yuborilmagan')
    }

    const result = await this.otpRepo.findOne({
      where: { id: obj.otp_id}
    });

    if (result !=null) {
      if(!result.verified) {
        if(dates.compare(result.expiretion_time, currentdate)) {
          if (otp ===result.otp) {
            const user = await this.userRepo.findOne({
              where: {phone: check}
            })
            if(user) {
              const verified_otp = await this.otpRepo.update(
                {verified: true},
                {where: {id: obj.otp_id}, returning: true}
              )
              const updatedUser = await this.userRepo.update(
                { is_owner: true},
                {where: {id: user.id}, returning: true}
              )
              const response = {
                message: 'User updates as orner',
                user: updatedUser[1][0]
              }
              return response
            }
          }else {
            throw new BadRequestException('OTP is not match')
          }
        }else{
          throw new BadRequestException('OTP expired')
        }
      }else{
        throw new BadRequestException('OTP alredy Used')
      }
    }else{
      throw new BadRequestException('bunday foydalanuvchi yuq')
    }


  }



  
  }





  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  



