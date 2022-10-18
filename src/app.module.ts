import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./modules/user/user.module";
import { ChatModule } from "./modules/chat/chat.module";
import { GroupsModule } from "./modules/groups/groups.module";

import { AppController } from './app.controller';

@Module( {
    imports: [
        ConfigModule.forRoot( {
            envFilePath: `.${ process.env.mode }.env`
        } ),
        TypeOrmModule.forRoot( {
            type: "mysql",
            host: process.env.host,
            username: process.env.user,
            database: process.env.database,
            password: process.env.password,
            charset: "utf8mb4_unicode_ci",
            autoLoadEntities: true,
            synchronize: Boolean( process.env.sync )
        } ),
        UserModule,
        ChatModule,
        GroupsModule,
    ],
    controllers: [
        AppController
    ],
} )
export class AppModule {
}
