import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ProfessionalService } from './professional.service';

@Controller('professional')
export class ProfessionalController {
    constructor(private readonly professionalService: ProfessionalService) { }
    
    @Get()
    getProfessionals(@Query('profession') profession?: string, @Query('cities') cities?: string) {
        if (profession && cities) {
            return this.professionalService.findByProfessionAndCities(profession, cities);
        } 
        if (profession) {
            return this.professionalService.findByProfession(profession);
        }
        if (cities) {
            return this.professionalService.findByCities(cities);
        }
        return this.professionalService.getProfessionals();
    }

     @Get(':id')
     getProfessionalById(@Param('id') id: string) {
         return this.professionalService.findOne(id);
     }
 
     @Post()
     async create(@Body() createProfessional: any) {
         return this.professionalService.create(createProfessional);
     }
 
     @Delete(':id')
     delete(@Param('id') id: string) {
         return this.professionalService.delete(id);
     }
 
     @Put(':id')
     update(@Param('id') id: string, @Body() updateProfessional: any) {
         return this.professionalService.update(id, updateProfessional);
     }

}
