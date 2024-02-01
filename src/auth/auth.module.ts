import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma.service';
import { Hashing } from 'src/common/utils/hashing/hashing';

@Module({
  controllers: [AuthController],
  providers: [AuthService,PrismaService,Hashing]
})
export class AuthModule {}
