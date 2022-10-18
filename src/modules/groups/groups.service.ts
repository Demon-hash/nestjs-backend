import { Injectable } from "@nestjs/common";
import { GroupsDto } from "../../DTO/groups.dto";
import { IdDto } from "~/src/DTO/id.dto";

@Injectable()
export class GroupsService {
    constructor() {
    }

    private readonly groups: GroupsDto[] = [];

    async getAll( id: string | number ): Promise<GroupsDto[]> {
        const privateGroups = this.groups.filter( group => group.hidden && (group.belongsTo == id || group.members?.findIndex( member => member.id == id ) > -1) );
        const publicGroups = this.groups.filter( group => !group.hidden );
        return [ ...publicGroups, ...privateGroups ];
    }

    async create( { ico, title, hidden, belongsTo }: GroupsDto ): Promise<IdDto> {
        const id = 0;
        this.groups.push( { ico, title, hidden, id, belongsTo } );
        return { id };
    }
}
