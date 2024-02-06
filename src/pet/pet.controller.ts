import { Body, Controller, Post, Req,  UseGuards } from '@nestjs/common';
import { PetService } from './pet.service';
import { AddPetDto } from './dto/addPet.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RequestWithUserData } from 'src/common/interfaces/common.interfaces';

@Controller('pet')
export class PetController {
    constructor(
        private readonly petService: PetService
    ) {}

    @Post()
    @UseGuards(AuthGuard)
    addPet(@Body() addPetDto: AddPetDto, @Req() request: RequestWithUserData) {
        
        return this.petService.addPet(addPetDto,request.user.id);
    }

}
