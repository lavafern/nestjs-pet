import {  ConflictException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { PrismaService } from 'src/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {}

    async register(registerDto: RegisterDto) : Promise<User> {
            const checkUser = await this.prisma.user.findUnique({
                where : {
                    email : registerDto.email
                }
            });

            if (checkUser) throw new ConflictException("User already exist");

            const createdUser = await this.prisma.user.create({
                data : {
                    email : registerDto.email,
                    password : registerDto.password,
                    profile : {
                        create : {
                            name : registerDto.name,
                            profilePicture : "https://ik.imagekit.io/itspace/1703206263941_Prl5a3M8w.png?updatedAt=1703206266592"
                        }
                    }
                }
            });

			console.log("aw");
			

            return createdUser;
    }
}
