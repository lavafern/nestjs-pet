import { Gender, IClass, Status } from "@prisma/client";
import { IsArray, IsDefined, IsNotEmpty, IsString } from "class-validator";

export class AddPetDto {
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    status: Status;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    gender: Gender;


    @IsDefined()
    @IsNotEmpty()
    @IsString()
    species: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    class: IClass;

    @IsDefined()
    @IsNotEmpty()
    @IsArray()
    diet: Array<string>;
}

export class AddPetDtoResponse extends AddPetDto {
    url: string;
}; 