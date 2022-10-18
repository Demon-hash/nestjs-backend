import { ApiProperty } from "@nestjs/swagger";

export class GroupMemberDTO {
    @ApiProperty()
    readonly id: number;
    @ApiProperty()
    readonly permissions: number;
}
