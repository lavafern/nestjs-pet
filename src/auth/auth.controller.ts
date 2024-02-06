import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/register.dto';
import { User } from '@prisma/client';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
        ) {}

    @Post('register')
    async register(@Body() registerDto: RegisterDto) : Promise<User> {
        
        return await this.authService.register(registerDto);
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
        const credential = await this.authService.login(loginDto);
        
        res.cookie('_a', credential.accessToken, {httpOnly : true, maxAge: 3600000 * 24 * 7  ,sameSite: 'none', secure: true});
        res.cookie('_r', credential.refreshToken,  {httpOnly : true, maxAge: 3600000 * 24 * 7  ,sameSite: 'none', secure: true});
        
        return true;
    }

    @Post('decode')
    async decode(@Body() body : {token : string}) {
        console.log(body);
        
        return await this.authService.decode(body.token);
    }
}
