import { Injectable, CanActivate, ExecutionContext,Inject, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject('JwtAccessSecret') private readonly jwtAccessSecret: JwtService,
    @Inject('JwtRefreshSecret') private readonly jwtRefreshSecret: JwtService
  ) {}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const tokens = request.cookies as {_a:string,_r:string}; 

    const accessToken = tokens._a;
    const refreshToken = tokens._r;
    
    
    if (!accessToken || !refreshToken) throw new UnauthorizedException("Unauthorized");

    try {
        const user = await this.jwtAccessSecret.verifyAsync(accessToken);
        
        
        request.user = user;

        return true;
    } catch (err) {
      try {
        
        const userConstruct = await this.jwtRefreshSecret.verifyAsync(refreshToken) as  {
          id: number;
          email: string;
        }; ;

        const user = {
          id: userConstruct.id,
          email: userConstruct.email
        };

        const newAccessToken = await this.jwtAccessSecret.sign(user);

        response.cookie('_a', newAccessToken, {httpOnly : true, maxAge: 3600000 * 24 * 7  ,sameSite: 'none', secure: true});

        request.user = user;

        return true;

      } catch (err) {
          throw new UnauthorizedException("Unauthorized");
      }

    }

  }
}