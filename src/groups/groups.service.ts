import { Injectable } from "@nestjs/common";
import { GroupsDto } from "../DTO/groups.dto";
import { v1 as uuidv1 } from 'uuid';

@Injectable()
export class GroupsService {
    constructor() {
    }

    private readonly groups: GroupsDto[] = [];

    async getAll( id: string | number ): Promise<GroupsDto[]> {
        const privateGroups = this.groups.filter( group => group.hidden && (group.ownerId == id || group.members?.findIndex( member => member.id == id ) > -1) );
        const publicGroups = this.groups.filter( group => !group.hidden );
        return [ ...publicGroups, ...privateGroups ];
    }

    async create( { ico, title, hidden, ownerId }: GroupsDto ): Promise<{ id: string }> {
        const id = `${ uuidv1() }`;
        this.groups.push( { ico, title, hidden, id, ownerId } );
        return { id };
    }
}
