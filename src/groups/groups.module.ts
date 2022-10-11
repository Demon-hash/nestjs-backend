import { Module } from "@nestjs/common";
import { GroupsController } from "./groups.controller";
import { JwtStrategy } from "../shared/strategy/jwt.strategy";
import { GroupsService } from "./groups.service";

@Module( {
    controllers: [
        GroupsController
    ],
    providers: [
        JwtStrategy,
        GroupsService
    ]
} )
export class GroupsModule {
}
