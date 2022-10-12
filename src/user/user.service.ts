import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { LoginDto } from "../DTO/login.dto";
import { JWTTokens, User, UserDto } from "../DTO/user.dto";
import { AuthService } from "../shared/auth.service";

@Injectable()
export class UserService {

    private readonly users: UserDto[] = [
        {
            id: "1",
            firstName: "Dmitry",
            lastName: "Burlaka",
            email: "t@t.co",
            password: "a1",
            role: "Admin"
        },
        {
            id: "2",
            firstName: "Katya",
            lastName: "Denson",
            email: "k@t.co",
            password: "a1",
            role: "User"
        }
    ];

    constructor( private readonly auth: AuthService ) {
    }

    async create( { firstName, lastName, email, password }: UserDto ): Promise<JWTTokens> {
        if ( firstName == null || lastName == null || email == null || password == null ) {
            throw new InternalServerErrorException()
        }

        const id = new Date().getTime().toString();

        this.users.push( { id, firstName, lastName, email, password, role: "User" } );

        return await this.auth.login( { email, password, id } );
    }

    async validate( { email, password }: LoginDto ): Promise<User | null> {
        const id = this.users.findIndex( u => u.email === email && u.password === password );
        if ( id > -1 ) {
            const { password, ...rest } = this.users[ id ];
            return rest;
        }
    }

    async getById( { user } ): Promise<User | null> {
        const id = this.users.findIndex( u => u.id == user );
        if ( id > -1 ) {
            const { password, ...rest } = this.users[ id ];
            return rest;
        }
        return;
    }
}
