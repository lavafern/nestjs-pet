import { Gender, Status } from "@prisma/client";

export class AddPetDto {
    status: Status;
    name: string;
    gender: Gender;
    picture: string;
    species?: string;
    class?: string;
    diet?: Array<string>;
}