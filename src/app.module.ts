import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { UserModule } from './user/user.module';
import { PetModule } from './pet/pet.module';
import { ImagekitModule } from './shared/imagekit/imagekit/imagekit.module';
@Module({
  imports: [ConfigModule.forRoot(),AuthModule, UserModule,PetModule, ImagekitModule],
  controllers: [AppController],
  providers: [AppService,PrismaService],
})
export class AppModule {}
