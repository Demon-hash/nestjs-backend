import { ApiProperty } from "@nestjs/swagger";
import { LoginDataDTO } from "~/src/DTO/login-data.dto";

export class LoginDto {
    @ApiProperty()
    readonly user: LoginDataDTO;
}
