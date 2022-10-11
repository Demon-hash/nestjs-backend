import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from "../shared/guards/jwt-auth.guard";
import { GroupsService } from "./groups.service";
import { GroupsDto } from "../DTO/groups.dto";

@Controller( 'groups' )
export class GroupsController {
    constructor(private readonly groups: GroupsService) {
    }

    @UseGuards( JwtAuthGuard )
    @Get()
    async getAll( @Request() req ): Promise<GroupsDto[]> {
        return this.groups.getAll();
    }
}
