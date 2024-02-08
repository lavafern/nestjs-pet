import { NotFoundException } from "@nestjs/common";

export class PetNotFoundException extends NotFoundException {
    
    constructor() {
        const objectOrError = 'Pet Not Found';
        super(objectOrError);
    }
}