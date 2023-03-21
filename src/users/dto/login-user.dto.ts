import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsDate, IsEmail, IsStrongPassword , isPhoneNumber, IsDateString, IsPhoneNumber, MinLength, IsEmpty} from "class-validator";


export class LoginUserDto {
    @ApiProperty({ example: 'email', description: 'Foydalanuvchi emaili'})
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'Pa$$word', description: 'Foydalanuvchi paroli'})
    @IsNotEmpty()
    @IsString()
    password: string
}