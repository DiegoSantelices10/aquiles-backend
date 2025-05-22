import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { MessageClientService } from './messageClient.service';

@Controller('messageClient')
export class MessageClientController {
    constructor(private readonly messageService: MessageClientService) { }

 
     @Get()
     getMessages() {
         return this.messageService.getMessages();
     }

     @Get(':id')
     getMessageById(@Param('id') id: string) {
         return this.messageService.findOne(id);
     }
 
     @Post()
     async create(@Body() createMessage: any) {
         return this.messageService.create(createMessage);
     }
 
     @Delete(':id')
     delete(@Param('id') id: string) {
         return this.messageService.delete(id);
     }
 
     @Put(':id')
     update(@Param('id') id: string, @Body() updateMessage: any) {
         return this.messageService.update(id, updateMessage);
     }
}
