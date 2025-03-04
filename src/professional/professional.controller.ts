import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query } from '@nestjs/common';
import { ProfessionalService } from './professional.service';
import { Professional } from './schemas/professional.schema';
import { ConfigService } from '@nestjs/config';

@Controller('professional')
export class ProfessionalController {
    constructor(
        private readonly professionalService: ProfessionalService,
    ) { }
    
    @Get()
    getProfessionals(@Query('profession') profession?: string, @Query('city') city?: string) {
        if (profession && city) {
            return this.professionalService.findByProfessionAndCities(profession, city);
        } 
        if (profession) {
            return this.professionalService.findByProfession(profession);
        }
        if (city) {
            return this.professionalService.findByCity(city);
        }
        return this.professionalService.getProfessionals();
    }

     @Get(':id')
     getProfessionalById(@Param('id') id: string) {
         return this.professionalService.findOne(id);
     }

     @Delete(':id/remove-image')
     async removeImage(@Param('id') userId: string, @Body() public_id: any) {
       return this.professionalService.removeImage(userId, public_id);
     }


     @Post()
    async createProfessional(@Body() professionalData: Partial<Professional>) {
       const { professional } = await this.professionalService.create(professionalData);
       return { message: 'Profesional creado exitosamente',  professional };
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
