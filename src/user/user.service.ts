import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { GetUsersResponse } from './interfaces/user.intarfaces';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class UserService {
    constructor(
        private readonly prisma: PrismaService
    ){}

    async getAll() : Promise<GetUsersResponse[]>{
        try {
            const users = await this.prisma.user.findMany({
                select : {
                    id : true,
                    email : true,
                    profile : {
                        select : {
                            name : true,
                            profilePicture: true
                        }
                    }
                }
            });

            return users;
        } catch (err) {
            console.log(err);
            
            throw err;
        }
    }

    async getByEmail(userEmail: string) {
        try {
            const user = await this.prisma.user.findUniqueOrThrow({
                where : {
                    email : userEmail
                },
                select : {
                    id : true,
                    email : true,
                    password: true,
                    profile : {
                        select : {
                            name : true,
                            profilePicture : true
                        }
                    }
                }
            });

            return user;
        } catch (err) {
            if (err instanceof(PrismaClientKnownRequestError) && err.code=='P2025') {
                throw new NotFoundException(err.message);
            }
            throw err;
        }
    }

    async getById(userId : number) : Promise<GetUsersResponse>{
        try {
            const user = await this.prisma.user.findUniqueOrThrow({
                where : {
                    id : userId
                },
                select : {
                    id : true,
                    email : true,
                    profile : {
                        select : {
                            name : true,
                            profilePicture : true
                        }
                    }
                }
            });

            return user;
        } catch (err) {
            console.log(err);
            if (err instanceof(PrismaClientKnownRequestError) && err.code=='P2025') {
                throw new NotFoundException(err.message);
            }
            throw err;
        }
    }
}
