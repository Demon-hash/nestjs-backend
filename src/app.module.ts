import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from "./user/user.module";
import { ChatModule } from "./chat/chat.module";
import { GroupsModule } from "./groups/groups.module";

@Module( {
    imports: [
        UserModule,
        ChatModule,
        GroupsModule
    ],
    controllers: [
        AppController
    ],
} )
export class AppModule {
}
