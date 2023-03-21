import { IsNotEmpty, IsString, IsDate, IsEmail, IsStrongPassword , isPhoneNumber, IsDateString, IsPhoneNumber, MinLength, IsEmpty} from "class-validator";


export class LogoutUserDto {

    @IsNotEmpty()
    @IsString()
    password: string
}