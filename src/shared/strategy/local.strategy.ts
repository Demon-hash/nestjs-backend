import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserEntity } from "../../entities/user.entity";
import { UserService } from "../../modules/user/user.service";

@Injectable()
export class LocalStrategy extends PassportStrategy( Strategy ) {
    constructor( private readonly users: UserService ) {
        super({ usernameField: 'email' });
    }

    async validate(email: string, password: string): Promise<Omit<UserEntity, "password">> {
        const user = await this.users.validate( { email, password } );
        if ( !user ) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
