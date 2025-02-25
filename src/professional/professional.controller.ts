import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query } from '@nestjs/common';
import { ProfessionalService } from './professional.service';
import { Professional } from './schemas/professional.schema';
import { ConfigService } from '@nestjs/config';

@Controller('professional')
export class ProfessionalController {
    constructor(
        private readonly professionalService: ProfessionalService,
        private readonly configService: ConfigService
    ) { }
    
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
     async createProfessional(@Body() professionalData: Partial<Professional>) {
       const { professional, resetToken } = await this.professionalService.create(professionalData);
       return { message: 'Profesional creado exitosamente',  professional, resetToken };
     }

     @Post('reset-password')
     async resetPassword(@Body('token') token: string, @Body('password') newPassword: string) {
      const decoded = this.professionalService.verifyResetToken(token);
      if (!decoded) {
        return { message: 'Token inválido o expirado' };
      }
      const professional = await this.professionalService.updatePassword(decoded.id, newPassword);
      
      if (!professional) {
        return { message: 'Profesional no encontrado' };
      }
  
      return { message: 'Contraseña actualizada correctamente' };
    }
 
     @Delete(':id')
     delete(@Param('id') id: string) {
         return this.professionalService.delete(id);
     }
 
     @Put(':id')
     update(@Param('id') id: string, @Body() updateProfessional: any) {
         return this.professionalService.update(id, updateProfessional);
     }

     @Post('login')
     @HttpCode(200)
     async login(@Body('email') email: string, @Body('password') password: string) {
      
       return await this.professionalService.loginProfessional(Promise.resolve({ email, password }));
     }

}
