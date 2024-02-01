import { IsEmail, IsNotEmpty, IsDefined, IsOptional, MinLength, MaxLength } from "class-validator";

export class RegisterDto {
    @IsEmail()
    @IsNotEmpty()
    @IsDefined()
    @IsNotEmpty()
    email : string;

    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(14)
    @IsDefined()
    @IsNotEmpty()
    password :  string;

    @IsDefined()
    @IsNotEmpty()
    name : string;

    @IsOptional()
    country : string;

    profilePicture : string;

}

export class LoginDto {
    @IsEmail()
    @IsNotEmpty()
    @IsDefined()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(14)
    @IsDefined()
    @IsNotEmpty()
    password: string;
}