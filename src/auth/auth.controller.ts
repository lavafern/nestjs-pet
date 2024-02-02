import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/register.dto';
import { User } from '@prisma/client';
import { jwtConstants } from './jwt/constants';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(@Body() registerDto: RegisterDto) : Promise<User> {
        
        return await this.authService.register(registerDto);
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        console.log(jwtConstants);
        
        return await this.authService.login(loginDto);
    }

    @Post('decode')
    async decode(@Body() body : {token : string}) {
        console.log(body);
        
        return await this.authService.decode(body.token);
    }
}
