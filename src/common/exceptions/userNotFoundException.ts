import { NotFoundException } from "@nestjs/common";

export class UserNotFoundException extends NotFoundException {
    
    constructor() {
        const objectOrError = 'User Not Found';
        super(objectOrError);
    }
}