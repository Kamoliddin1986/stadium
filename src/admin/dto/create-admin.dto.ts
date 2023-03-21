import { IsNotEmpty, IsString, IsDate, IsEmail, IsStrongPassword , isPhoneNumber, IsDateString, IsPhoneNumber, MinLength} from "class-validator";



export class CreateAdminDto {

    @IsNotEmpty()
    @IsString()
    readonly username: string;

    @IsEmail()
    readonly email: string;


    @IsNotEmpty()
    @MinLength(6)
    @IsStrongPassword()
    readonly password: string;

    @IsNotEmpty()
    readonly confirm_password: string;

    

}
