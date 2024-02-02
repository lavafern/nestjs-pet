import { Module } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { jwtConstants } from "./constants";

@Module({
    imports: [JwtModule.register({
      secret: jwtConstants.ACCESS_SECRET,
      signOptions: { expiresIn: '10s' },
    })],
    providers: [{
      provide: 'JwtAccessSecret',
      useExisting: JwtService,
    }],
    exports: ['JwtAccessSecret'],
  })
  export class JwtSecret2Module {}