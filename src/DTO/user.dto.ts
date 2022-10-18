import { ApiProperty } from "@nestjs/swagger";
import { UserRole } from "~/src/types";

export class UserDto {
    @ApiProperty({
        required: false
    })
    id?: number | undefined;
    @ApiProperty()
    firstName?: string | undefined;
    @ApiProperty()
    lastName?: string | undefined;
    @ApiProperty()
    email?: string | undefined;
    @ApiProperty({
        required: false,
        deprecated: true
    })
    password: string | undefined;
    @ApiProperty({
        enum: UserRole,
        required: false
    })
    role?: UserRole | undefined;
}
