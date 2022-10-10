import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";

import { UserController } from "./user.controller";

import { AuthService } from "../shared/auth.service";
import { UserService } from "./user.service";

import { JwtStrategy } from "../shared/strategy/jwt.strategy";
import { LocalStrategy } from "../shared/strategy/local.strategy";

import { JWT_ACCESS_SECRET } from "../consts";

@Module( {
    imports: [
        PassportModule.register({
            defaultStrategy: "jwt"
        }),
        JwtModule.register( {
            secret: JWT_ACCESS_SECRET,
            signOptions: {
                expiresIn: "30m"
            }
        } )
    ],
    controllers: [
        UserController
    ],
    providers: [
        AuthService,
        UserService,
        LocalStrategy,
        JwtStrategy,
    ]
} )
export class UserModule {
}
