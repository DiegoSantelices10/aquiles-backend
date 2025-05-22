import { MongooseModule } from "@nestjs/mongoose";
import { Module } from "@nestjs/common";
import { MessageClient, messageClientSchema } from "./schemas/messageClient.schema";
import { MessageClientService } from "./messageClient.service";
import { MessageClientController } from "./messageClient.controller";


@Module({
    imports: [
        MongooseModule.forFeature([
            { 
                name: MessageClient.name, 
                schema: messageClientSchema 
            },
        ]),
    ],
    controllers: [MessageClientController],
    providers: [MessageClientService],
})

export class MessageClientModule {}