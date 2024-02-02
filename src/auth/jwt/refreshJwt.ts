import { Module } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { jwtConstants } from "./constants";

@Module({
    imports: [JwtModule.register({
      secret: jwtConstants.REFRESH_SECRET,
      signOptions: { expiresIn: '7d' },
    })],
    providers: [{
      provide: 'JwtRefreshSecret',
      useExisting: JwtService,
    }],
    exports: ['JwtRefreshSecret'],
  })
  export class JwtSecret1Module {}