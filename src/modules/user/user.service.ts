import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AuthService } from "~/src/shared/auth.service";
import { UserEntity } from "~/src/entities/user.entity";
import { UserRole } from "~/src/types";
import { UserDto } from "~/src/DTO/user.dto";
import { JWTTokensDTO } from "~/src/DTO/jwt.dto";
import { LoginDataDTO } from "~/src/DTO/login-data.dto";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository( UserEntity )
        private readonly usersRepository: Repository<UserEntity>,
        private readonly auth: AuthService
    ) {
    }

    async create( { firstName, lastName, email, password }: UserDto ): Promise<JWTTokensDTO | null> {
        if ( firstName == null || lastName == null || email == null || password == null ) {
            throw new InternalServerErrorException();
        }

        try {
            const result = await this.usersRepository.insert( {
                firstName, lastName, email, password, role: UserRole.USER
            } );

            const id = result?.raw?.insertId;

            if ( id ) {
                return await this.auth.login( { email, password, id } );
            }

            return;
        } catch ( e ) {
            console.error( '[Users::Service::Create] ', e );
            return;
        }
    }

    async validate( { email, password }: LoginDataDTO ): Promise<Omit<UserEntity, "password"> | null> {
        try {
            const result = await this.usersRepository.manager.findOneBy( UserEntity, {
                email,
                password
            } );
            if ( result ) {
                const { password, ...rest } = result;
                return rest;
            }
            return;
        } catch ( e ) {
            console.error( '[Users::Service::Validate] ', e );
            return;
        }
    }

    async getById( { user } ): Promise<Omit<UserEntity, "password"> | null> {
        try {
            const result = await this.usersRepository.manager.findOneBy( UserEntity, {
                id: user
            } );
            if ( result ) {
                const { password, ...rest } = result;
                return rest;
            }
            return;
        } catch ( e ) {
            console.error( '[Users::Service::getById] ', e );
            return;
        }
    }
}
