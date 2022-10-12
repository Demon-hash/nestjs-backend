import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from "../shared/guards/jwt-auth.guard";
import { GroupsService } from "./groups.service";
import { GroupsDto } from "../DTO/groups.dto";

@Controller( 'api/groups' )
export class GroupsController {
    constructor(private readonly groups: GroupsService) {
    }

    @UseGuards( JwtAuthGuard )
    @Get()
    async getAll( @Request() req ): Promise<GroupsDto[]> {
        return await this.groups.getAll(req.user);
    }

    @UseGuards( JwtAuthGuard )
    @Post('create')
    async create( @Body() data: GroupsDto ): Promise<{id: string}> {
        return await this.groups.create(data);
    }
}
