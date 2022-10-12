export interface GroupsDto {
    id?: string;
    ownerId: string;
    title: string;
    ico: string;
    hidden?: boolean;
    members?: GroupMemberDTO[];
}

export interface GroupMemberDTO {
    id: string;
    permissions: number;
}
