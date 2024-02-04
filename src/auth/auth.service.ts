import {  ConflictException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto/register.dto';
import { PrismaService } from 'src/prisma.service';
import { User } from '@prisma/client';
import { Hashing } from 'src/common/utils/hashing/hashing';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { CredentialToken } from './interface/auth';
@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly hashing: Hashing,
        @Inject('JwtAccessSecret') private readonly jwtAccessSecret: JwtService,
        @Inject('JwtRefreshSecret') private readonly jwtRefreshSecret: JwtService
    ) {}

    async register(registerDto: RegisterDto) : Promise<User> {
            try {
                
                const hashedPassword = await this.hashing.HashPassword(registerDto.password);

                const createdUser = await this.prisma.user.create({
                    data : {
                        email : registerDto.email,
                        password : hashedPassword,
                        profile : {
                            create : {
                                name : registerDto.name,
                                profilePicture : "https://ik.imagekit.io/itspace/1703206263941_Prl5a3M8w.png?updatedAt=1703206266592"
                            }
                        }
                    }
                });

            return createdUser;

            } catch (err ) {
                if (err instanceof(PrismaClientKnownRequestError) && err.code=='P2002') throw new ConflictException("Email already used");
                throw err;
            }

    }

    async login(loginDto: LoginDto) : Promise<CredentialToken> {
        try {
            
            const checkUser = await this.prisma.user.findUniqueOrThrow({
                where : {
                    email : loginDto.email
                }
            });
        
            const checkPassword = await this.hashing.comparePassword(loginDto.password,checkUser.password);
            
            if (!checkPassword) throw new UnauthorizedException("Wrong email or password");

            const signAccessToken = this.jwtAccessSecret.signAsync({
                id: checkUser.id,
                email: checkUser.email
            });

            const signRefreshToken = this.jwtRefreshSecret.signAsync({
                  id: checkUser.id,
                  email: checkUser.email
            });

            const [accessToken,refreshToken] = await Promise.all([signAccessToken,signRefreshToken]);

            delete checkUser.password;



            return {
                accessToken,
                refreshToken
            };

        } catch (err) {
            if (err instanceof(PrismaClientKnownRequestError) && err.code=='P2025') throw new UnauthorizedException("Wrong email or password");
            throw err;
        }

    }

    async decode(token : string) {
        console.log(token);
        
        const r = await this.jwtRefreshSecret.verifyAsync(token);
        console.log(r);
        
        return '';
    }
}
