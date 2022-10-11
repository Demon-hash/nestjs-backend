import { Injectable } from "@nestjs/common";
import { GroupsDto } from "../DTO/groups.dto";
import { v1 as uuidv1 } from 'uuid';

@Injectable()
export class GroupsService {
    constructor() {
    }

    private readonly groups: GroupsDto[] = [];

    async getAll(): Promise<GroupsDto[]> {
        return this.groups;
    }

    async create({ ico, title, hidden }: GroupsDto): Promise<{id: string}> {
        const id = `${uuidv1()}`;
        this.groups.push({ ico, title, hidden, id });
        return { id };
    }
}
