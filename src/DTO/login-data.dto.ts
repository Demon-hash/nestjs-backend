import { ApiProperty } from "@nestjs/swagger";

export class LoginDataDTO {
    @ApiProperty()
    readonly email?: string;
    @ApiProperty()
    readonly password?: string;
}
