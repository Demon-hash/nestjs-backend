import { Body, Controller, Get, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import {
    ApiBody,
    ApiConsumes,
    ApiHeader,
    ApiOperation,
    ApiParam,
    ApiProduces,
    ApiResponse,
    ApiTags
} from "@nestjs/swagger";
import { AuthService } from "../../shared/auth.service";
import { UserService } from "./user.service";
import { JwtAuthGuard } from "../../shared/guards/jwt-auth.guard";
import { LocalAuthGuard } from "../../shared/guards/local-auth.guard";
import { UserEntity } from "../../entities/user.entity";
import { JWTTokensDTO } from "~/src/DTO/jwt.dto";
import { CreateUserDTO } from "~/src/DTO/create-user.dto";
import { LoginDto } from "~/src/DTO/login.dto";
import { LoginDataDTO } from "~/src/DTO/login-data.dto";
import { UserDto } from "~/src/DTO/user.dto";

@ApiTags('user')
@Controller( 'api/user' )
export class UserController {
    constructor(
        private readonly users: UserService,
        private readonly auth: AuthService,
    ) {
    }

    @ApiOperation( { summary: "Creates a new user" } )
    @ApiParam({ name: "firstName", required: true, description: "user's first name", type: "string" })
    @ApiParam({ name: "lastName", required: true, description: "user's last name", type: "string" })
    @ApiParam({ name: "email", required: true, description: "user's email", type: "string" })
    @ApiParam({ name: "password", required: true, description: "user's password", type: "string" })
    @ApiResponse( { status: HttpStatus.CREATED, type: JWTTokensDTO, description: "User has been created and two type of tokens returned" } )
    @ApiResponse( { status: HttpStatus.INTERNAL_SERVER_ERROR, type: null, description: "User creation has failed (Invalid params or Database error)" } )
    @ApiConsumes( "application/json" )
    @ApiProduces( "application/json" )
    @Post( 'create' )
    async create( @Body() data: CreateUserDTO ): Promise<JWTTokensDTO | null> {
        return await this.users.create( data );
    }

    @ApiOperation( { summary: "Login a user" } )
    @ApiParam({ name: "email", required: true, description: "user's email", type: "string" })
    @ApiParam({ name: "password", required: true, description: "user's password", type: "string" })
    @ApiBody({ type: LoginDataDTO })
    @ApiResponse( { status: HttpStatus.CREATED, type: JWTTokensDTO, description: "User has been logged and two type of tokens returned" } )
    @ApiResponse( { status: HttpStatus.UNAUTHORIZED, type: null, description: "User not found / wrong data" } )
    @ApiConsumes( "application/json" )
    @ApiProduces( "application/json" )
    @UseGuards( LocalAuthGuard )
    @Post( 'login' )
    async login( @Request() data: LoginDto ): Promise<JWTTokensDTO> {
        return await this.auth.login( data.user );
    }

    @ApiOperation( { summary: "Checks for valid session" } )
    @ApiHeader({ name: "Authorization", required: true, description: "user's access token", example: "Bearer (your-token-here)" })
    @ApiResponse( { status: HttpStatus.OK, type: UserDto, description: "User has been logged" } )
    @ApiResponse( { status: HttpStatus.UNAUTHORIZED, type: null, description: "User not found / wrong data" } )
    @ApiProduces( "application/json" )
    @UseGuards( JwtAuthGuard )
    @Get( 'session' )
    async session( @Request() req ): Promise<Omit<UserEntity, "password"> | null> {
        return this.users.getById( req );
    }
}
