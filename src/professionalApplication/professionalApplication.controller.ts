import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ProfessionalApplicationService } from './professionalApplication.service';

@Controller('professionalApplication')
export class ProfessionalApplicationController {
    constructor(private readonly messageService: ProfessionalApplicationService) { }

 
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
