import { InternalServerErrorException } from "@nestjs/common";

export class ImagekitException extends InternalServerErrorException{

    constructor(objectOrError: string) {
        super(objectOrError);
    }
}


