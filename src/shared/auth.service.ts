import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { JWTTokens } from "../DTO/user.dto";

import { JWT_REFRESH_SECRET } from "../consts";

@Injectable()
export class AuthService {

    constructor( private readonly jwtService: JwtService ) {
    }

    async login( data: any ): Promise<JWTTokens> {
        const { email, password, id } = data;
        const payload = { email, password, sub: id };
        return {
            access_token: this.jwtService.sign( payload ),
            refresh_token: this.jwtService.sign( payload, { secret: JWT_REFRESH_SECRET, expiresIn: '30d' } )
        }
    }
}
