import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserService } from "../../user/user.service";
import { User } from "../../DTO/user.dto";

@Injectable()
export class LocalStrategy extends PassportStrategy( Strategy ) {
    constructor( private readonly users: UserService ) {
        super({ usernameField: 'email' });
    }

    async validate(email: string, password: string): Promise<User | null> {
        const user = await this.users.validate( { email, password } );
        if ( !user ) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
