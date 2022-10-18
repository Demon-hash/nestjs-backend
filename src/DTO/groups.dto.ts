import { ApiProperty } from "@nestjs/swagger";
import { GroupMemberDTO } from "~/src/DTO/group-member.dto";

export class GroupsDto {
    @ApiProperty()
    @ApiProperty({
        deprecated: true
    })
    readonly id?: number;
    @ApiProperty()
    readonly belongsTo: number;
    @ApiProperty()
    readonly title: string;
    @ApiProperty()
    readonly ico: string;
    @ApiProperty({
        default: false,
        required: false
    })
    readonly hidden?: boolean;
    @ApiProperty({
        default: [],
        isArray: true,
        type: GroupMemberDTO,
        required: false
    })
    members?: GroupMemberDTO[];
}
