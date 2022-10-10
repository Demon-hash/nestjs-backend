import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from "./user/user.module";
import { ChatModule } from "./chat/chat.module";

@Module( {
    imports: [ UserModule, ChatModule ],
    controllers: [ AppController ],
} )
export class AppModule {
}
