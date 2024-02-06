import { BadRequestException, Body, Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, ParseFilePipeBuilder, Post, Req,  UploadedFile,  UseGuards, UseInterceptors } from '@nestjs/common';
import { PetService } from './pet.service';
import { AddPetDto } from './dto/addPet.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RequestWithUserData } from 'src/common/interfaces/common.interfaces';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('pet')
export class PetController {
    constructor(
        private readonly petService: PetService
    ) {}

    @Post()
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('file'))
    addPet(
        @Body() addPetDto: AddPetDto, 
        @Req() request: RequestWithUserData,
        @UploadedFile(new ParseFilePipeBuilder()
            .addMaxSizeValidator({
                maxSize: 10000000,
                message:'size'
            })
            .addFileTypeValidator({
                fileType: '\.(jpg|jpeg|png)$'
            })
            .build({
                exceptionFactory(error) {
     
                    if (error!=='size') {
                        throw new BadRequestException('File type must be jpg/jpeg/png');
                    }
                    throw new BadRequestException('Size must less than 10MB');
                },
                fileIsRequired: false
            })
        ) file: Express.Multer.File
    ) {

        console.log(file);

        return this.petService.addPet(addPetDto,request.user.id,file);
    }

    @Post('tes')
    @UseInterceptors(FileInterceptor('file'))
    tesupload(
        @UploadedFile(new ParseFilePipe({
            validators: [
                new MaxFileSizeValidator({ maxSize: 1 * 1000 }),
                new FileTypeValidator({ fileType: 'image/jpeg' }),
                new FileTypeValidator({ fileType: 'png' }),
            ],
            fileIsRequired: false
        }))
    file: Express.Multer.File
    ) {
        console.log(file);
        
        return true;
    }

}
