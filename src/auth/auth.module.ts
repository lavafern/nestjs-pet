import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma.service';
import { Hashing } from 'src/common/utils/hashing/hashing';
import { UserModule } from 'src/user/user.module';
import { JwtSecret1Module } from './jwt/refreshJwt';
import { JwtSecret2Module } from './jwt/accessJwt';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[
    UserModule,
    JwtModule,
    JwtSecret1Module,
    JwtSecret2Module
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaService,
    Hashing
  ]
})
export class AuthModule {}
