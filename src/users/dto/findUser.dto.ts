import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsDate, IsEmail, IsStrongPassword , isPhoneNumber, IsDateString, IsPhoneNumber, MinLength} from "class-validator";

export class FindUserDto {
    readonly first_name?: string;
    readonly last_name?: string;
    readonly username?: string;
    readonly email?: string;
    readonly phone?: string;
    readonly birthday_start?: Date;
    readonly birthday_end?: Date;

}


