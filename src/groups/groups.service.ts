import { Injectable } from "@nestjs/common";
import { GroupsDto } from "../DTO/groups.dto";

@Injectable()
export class GroupsService {
    constructor() {
    }

    private readonly groups: GroupsDto[] = [
        {
            title: "Angular",
            ico: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/1200px-Angular_full_color_logo.svg.png",
            id: "Ar:aA4A5Q8a64A68ce"
        },
        {
            title: "React",
            ico: "https://brandlogos.net/wp-content/uploads/2020/09/react-logo-512x512.png",
            id: "Rt:df4r8tg4fd5df6"
        },
        {
            title: "Vue",
            ico: "https://avatars.githubusercontent.com/u/6128107?s=200&v=4",
            id: "Ve:f8wf789awf789awf9"
        },
        {
            title: "TypeScript",
            ico: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/640px-Typescript_logo_2020.svg.png",
            id: "Ts:d4qY8d6A41N8R8"
        },
        {
            title: "JavaScript",
            ico: "https://cdn-icons-png.flaticon.com/512/5968/5968292.png",
            id: "Js:sX4w8Za44g5v6qv9"
        },
    ];

    getAll(): GroupsDto[] {
        return this.groups;
    }
}
