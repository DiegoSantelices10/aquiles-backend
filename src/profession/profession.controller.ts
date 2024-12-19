import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ProfessionService } from './profession.service';

@Controller('profession')
export class ProfessionController {
    constructor(private readonly professionService: ProfessionService) { }

    @Get()
     getProfessions() {
         return this.professionService.getProfessions();
     }
 
     @Get(':id')
     getProfessionById(@Param('id') id: string) {
         return this.professionService.findOne(id);
     }

     @Post()
     async create(@Body() createProfession: any) {
         return this.professionService.create(createProfession);
     }
 
     @Delete(':id')
     delete(@Param('id') id: string) {
         return this.professionService.delete(id);
     }
 
     @Put(':id')
     async update(@Param('id') id: string, @Body() updateProfession: any) {
       return this.professionService.update(id, updateProfession);
     }
}
