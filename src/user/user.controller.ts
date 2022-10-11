import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from "../shared/auth.service";
import { UserService } from "./user.service";
import { JwtAuthGuard } from "../shared/guards/jwt-auth.guard";
import { LocalAuthGuard } from "../shared/guards/local-auth.guard";
import { JWTTokens, User, UserDto } from "../DTO/user.dto";

@Controller( 'api/user' )
export class UserController {
    constructor(
        private readonly users: UserService,
        private readonly auth: AuthService,
    ) {
    }

    @Post( 'create' )
    async createUser( @Body() data: UserDto ): Promise<JWTTokens> {
        return await this.users.create( data );
    }

    @UseGuards( LocalAuthGuard )
    @Post( 'login' )
    async getTokens( @Request() data ): Promise<JWTTokens> {
        return await this.auth.login( data.user );
    }

    @UseGuards( JwtAuthGuard )
    @Get( 'session' )
    async isValidSession( @Request() req ): Promise<User> {
        return this.users.getById( req );
    }
}
