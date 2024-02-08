import {Body, Controller, ForbiddenException, Param, ParseIntPipe, Post, Put, Req,  UploadedFile,  UseGuards, UseInterceptors } from '@nestjs/common';
import { PetService } from './pet.service';
import { AddPetDto, AddPetDtoResponse} from './dto/addPet.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RequestWithUserData } from 'src/common/interfaces/common.interfaces';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageUploadConstants } from 'src/common/constants/imageUpload.constants';
import { AuthService } from 'src/auth/auth.service';
import { EditPetDto } from './dto/editPet.dto';

@Controller('pet')
export class PetController {
    constructor(
        private readonly petService: PetService,
        private readonly authService: AuthService
    ) {}

    @Post()
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('file'))
    async addPet(
        @Body() addPetDto: AddPetDto, 
        @Req() request: RequestWithUserData,
        @UploadedFile(imageUploadConstants) file: Express.Multer.File
    ) : Promise<AddPetDtoResponse>{

        return await this.petService.addPet(addPetDto,request.user.id,file);
    }

    @Put(':id')
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('file'))
    async editPet(
        @Param('id',ParseIntPipe) petId: number,
        @Body() editPetDto: EditPetDto ,
        @Req() request: RequestWithUserData,
        @UploadedFile(imageUploadConstants) file: Express.Multer.File
    ) {

        return this.petService.getPetById(petId);
        await this.authService.validatePetOwner(petId,request.user.id);
        
        return true;
    }


}
