import { Body, Controller, HttpCode, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/register.dto';
import { User } from '@prisma/client';
import { Response } from 'express';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
        ) {}

    @Post('register')
    @HttpCode(201)
    async register(@Body() registerDto: RegisterDto) : Promise<User> {
        
        return await this.authService.register(registerDto);
    }

    @Post('login')
    @HttpCode(200)
    async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
        const credential = await this.authService.login(loginDto);
        
        res.cookie('_a', credential.accessToken, {httpOnly : true, maxAge: 3600000 * 24 * 7  ,sameSite: 'none', secure: true});
        res.cookie('_r', credential.refreshToken,  {httpOnly : true, maxAge: 3600000 * 24 * 7  ,sameSite: 'none', secure: true});
        
        return true;
    }

    @Post('logout')
    @UseGuards(AuthGuard)
    @HttpCode(200)
    async logout(@Res({ passthrough: true }) res: Response) {
        console.log('awwa');
        
        res.clearCookie('_a');
        res.clearCookie('_r');

        return true;
    }

    @Post('decode')
    @HttpCode(200)
    async decode(@Body() body : {token : string}) {
        console.log(body);
        
        return await this.authService.decode(body.token);
    }
}
