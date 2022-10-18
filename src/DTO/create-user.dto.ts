import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDTO {
    @ApiProperty()
    readonly firstName: string | undefined;
    @ApiProperty()
    readonly lastName: string | undefined;
    @ApiProperty()
    readonly email: string | undefined;
    @ApiProperty()
    readonly password: string | undefined;
}
