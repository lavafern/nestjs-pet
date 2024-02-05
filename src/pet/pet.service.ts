import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AddPetDto } from './dto/addPet.dto';

@Injectable()
export class PetService {
    constructor(
        private readonly prisma: PrismaService
    ) {}
    
    async addPet(addPetDto: AddPetDto, userId: number)  {

        console.log(addPetDto);
        
        let insertDietQuery = `INSERT INTO "Diet" ("name","petId") VALUES `;

        for (let i = 0; i < addPetDto.diet.length; i++) {
            insertDietQuery += `('${addPetDto.diet[i]}',petId)`;
            
            if (i < addPetDto.diet.length -1) insertDietQuery += ',';

        }

        const newPet = await this.prisma.$queryRawUnsafe(`
        DO $$
            DECLARE
            	speciesId INT;
                petId INT;
            BEGIN
            	SELECT id INTO speciesId FROM "Species" WHERE name=\'${addPetDto.species}\';
                
            	IF FOUND THEN
            		insert into "Pet" ("name","gender","picture","speciesId","authorId","status","class") VALUES (\'${addPetDto.name}\',\'${addPetDto.gender}\',\'${addPetDto.picture}\',speciesId,${userId},\'${addPetDto.status}\',\'${addPetDto.class}\') RETURNING id INTO petId;
                    ${insertDietQuery};
            	ELSE
            		INSERT INTO "Species" ("name") VALUES (\'${addPetDto.species}\') RETURNING id INTO speciesId;
            		INSERT INTO "Pet" ("name","gender","picture","speciesId","authorId","status","class") VALUES (\'${addPetDto.name}\',\'${addPetDto.gender}\',\'${addPetDto.picture}\',speciesId,${userId},\'${addPetDto.status}\',\'${addPetDto.class}\') RETURNING id INTO petId;
                    ${insertDietQuery};
            	END IF;
            END $$;
        `);

        console.log(newPet);
        

        return addPetDto;
    }
    
}
