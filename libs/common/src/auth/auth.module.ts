import { HttpModule } from '@nestjs/axios';
import { Logger, Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { jwtConstants } from './jwt/jwt-constants';
import { JwtStrategy } from './jwt/jwt.strategy';
import { LocalAuthGuard } from './local/local-auth.guard';
import { LocalStrategy } from './local/local.strategy';

@Module({
    imports: [
        HttpModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: jwtConstants.expiry },
        }),
    ],
    providers: [
        AuthService,
        LocalAuthGuard,
        LocalStrategy,
        JwtStrategy,
        Logger,
    ],
    exports: [
        AuthService,
        LocalAuthGuard,
        LocalStrategy,
        JwtStrategy,
        JwtModule,
        HttpModule,
    ],
})
export class AuthModule {}
