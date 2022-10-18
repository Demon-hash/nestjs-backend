import { Body, Controller, Get, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from "../../shared/guards/jwt-auth.guard";
import { GroupsService } from "./groups.service";
import { GroupsDto } from "../../DTO/groups.dto";
import { ApiConsumes, ApiHeader, ApiOperation, ApiParam, ApiProduces, ApiResponse, ApiTags } from "@nestjs/swagger";
import { IdDto } from "~/src/DTO/id.dto";
import { GroupMemberDTO } from "~/src/DTO/group-member.dto";

@ApiTags('groups')
@Controller( 'api/groups' )
export class GroupsController {
    constructor(private readonly groups: GroupsService) {
    }

    @ApiOperation( { summary: "Creates a new group" } )
    @ApiHeader({ name: "Authorization", required: true, description: "user's access token", example: "Bearer (your-token-here)" })
    @ApiResponse( { status: HttpStatus.OK, type: [GroupsDto], description: "List of groups" } )
    @ApiResponse( { status: HttpStatus.INTERNAL_SERVER_ERROR, type: null, description: "Server / Database Error" } )
    @ApiProduces( "application/json" )
    @UseGuards( JwtAuthGuard )
    @Get()
    async getAll( @Request() req ): Promise<GroupsDto[]> {
        return await this.groups.getAll(req.user);
    }

    @ApiOperation( { summary: "Creates a new group" } )
    @ApiParam({ name: "members", required: false, description: "group's members", type: [GroupMemberDTO] })
    @ApiParam({ name: "hidden", required: false, description: "when hidden then this group is private", type: "string" })
    @ApiParam({ name: "ico", required: true, description: "group's ico", type: "string" })
    @ApiParam({ name: "title", required: true, description: "group's title", type: "string" })
    @ApiParam({ name: "belongsTo", required: true, description: "Belongs to user id", type: "number" })
    @ApiResponse( { status: HttpStatus.CREATED, type: IdDto, description: "Group has been created" } )
    @ApiResponse( { status: HttpStatus.INTERNAL_SERVER_ERROR, type: null, description: "Server / Database Error" } )
    @ApiConsumes( "application/json" )
    @ApiProduces( "application/json" )
    @UseGuards( JwtAuthGuard )
    @Post('create')
    async create( @Body() data: GroupsDto ): Promise<IdDto> {
        return await this.groups.create(data);
    }
}
