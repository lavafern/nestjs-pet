import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AddPetDto } from './dto/addPet.dto';
import { ImagekitService } from 'src/shared/imagekit/imagekit/imagekit.service';

@Injectable()
export class PetService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly imagekit: ImagekitService
    ) {}

    async petPicture() {

    }
    
    async addPet(addPetDto: AddPetDto, userId: number, pic: Express.Multer.File)  {

        const defaultPic = 'https://ik.imagekit.io/itspace/pet-management/paw.png?updatedAt=1707240512430';
        // const pict = pic ? pic : defaultPic;
//      
        const petPic = pic ? await this.imagekit.uploadImage(pic) : defaultPic;
        
        let insertDietQuery = `INSERT INTO "Diet" ("name","petId") VALUES `;

        for (let i = 0; i < addPetDto.diet.length; i++) {
            insertDietQuery += `('${addPetDto.diet[i]}',petData."id")`;
            
            if (i < addPetDto.diet.length -1) insertDietQuery += ',';

        }

        await this.prisma.$executeRawUnsafe(`
        DO $$
            DECLARE
            	speciesId INT;
                petData RECORD;
            BEGIN
            	SELECT id INTO speciesId FROM "Species" WHERE name=\'${addPetDto.species}\';
                
            	IF FOUND THEN
            		insert into "Pet" ("name","gender","picture","speciesId","authorId","status","class") VALUES (\'${addPetDto.name}\',\'${addPetDto.gender}\',\'${petPic}\',speciesId,${userId},\'${addPetDto.status}\',\'${addPetDto.class}\') RETURNING * INTO petData;
                    ${insertDietQuery};
                    RAISE NOTICE '%',petData;
            	ELSE
            		INSERT INTO "Species" ("name") VALUES (\'${addPetDto.species}\') RETURNING id INTO speciesId;
            		INSERT INTO "Pet" ("name","gender","picture","speciesId","authorId","status","class") VALUES (\'${addPetDto.name}\',\'${addPetDto.gender}\',\'${petPic}\',speciesId,${userId},\'${addPetDto.status}\',\'${addPetDto.class}\') RETURNING * INTO petData;
                    ${insertDietQuery};
                    RAISE NOTICE '%',petData;
            	END IF;
            COMMIT;
            END $$;
        `);

        return addPetDto;
    }
    
}
