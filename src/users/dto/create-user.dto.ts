import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsDate, IsEmail, IsStrongPassword , isPhoneNumber, IsDateString, IsPhoneNumber, MinLength} from "class-validator";

export class CreateUserDto {
    @ApiProperty({ example: 'Umid', description: 'Foydalanuvchi ismi'})
    @IsNotEmpty()
    @IsString()
    readonly first_name: string;

    @ApiProperty({ example: 'Umidov', description: 'Foydalanuvchi familiyasi'})
    @IsNotEmpty()
    @IsString()
    readonly last_name: string;


    @ApiProperty({ example: 'UmidLife', description: 'usernamei'})
    @IsNotEmpty()
    @IsString()
    readonly username: string;


    @ApiProperty({ example: 'P@$$word', description: 'Foydalanuvchi passwordi'})
    @IsNotEmpty()
    @MinLength(6)
    @IsStrongPassword()
    readonly password: string;


    @ApiProperty({ example: 'P@$$word', description: 'passwordini tasdiqlash'})
    @IsNotEmpty()
    readonly confirm_password: string;


    @ApiProperty({ example: 'umod@mail.ru', description: 'Foydalanuvchi emaili'})
    @IsEmail()
    readonly email: string;


    @ApiProperty({ example: '+9989333333', description: 'Foydalanuvchi raqami'})
    @IsPhoneNumber()
    readonly phone: string;


    @ApiProperty({ example: '2023-01-01', description: 'Foydalanuvchi tugilgan kuni'})
    @IsNotEmpty()
    @IsDateString()
    readonly birthday: Date;

}


