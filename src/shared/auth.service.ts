import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { JWT_REFRESH_SECRET } from "../consts";
import { JWTTokensDTO } from "~/src/DTO/jwt.dto";
import { LoginDataDTO } from "~/src/DTO/login-data.dto";

@Injectable()
export class AuthService {

    constructor( private readonly jwtService: JwtService ) {
    }

    async login( data: LoginDataDTO & { id?: number } ): Promise<JWTTokensDTO> {
        const { email, password, id } = data;
        const payload = { email, password, sub: id };
        return {
            access_token: this.jwtService.sign( payload ),
            refresh_token: this.jwtService.sign( payload, { secret: JWT_REFRESH_SECRET, expiresIn: '30d' } )
        }
    }
}
