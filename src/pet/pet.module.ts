import { Module } from '@nestjs/common';
import { PetController } from './pet.controller';
import { PetService } from './pet.service';
import { PrismaService } from 'src/prisma.service';
import { JwtSecret1Module } from 'src/auth/jwt/refreshJwt';
import { JwtSecret2Module } from 'src/auth/jwt/accessJwt';
import { ImagekitModule } from 'src/shared/imagekit/imagekit/imagekit.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[
    JwtSecret1Module,
    JwtSecret2Module,
    ImagekitModule,
    AuthModule
  ],
  controllers: [PetController],
  providers: [PrismaService,PetService]
})
export class PetModule {}
