import { Module } from '@nestjs/common';
import { ProfessionalApplicationController } from './professionalApplication.controller';
import { ProfessionalApplicationService } from './professionalApplication.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfessionalApplication, ProfessionalApplicationSchema } from './schemas/professionalApplication.schema';

@Module({
  imports: [
      MongooseModule.forFeature([
        {
          name: ProfessionalApplication.name,
          schema: ProfessionalApplicationSchema,
        },
      ]),
    ],
  controllers: [ProfessionalApplicationController],
  providers: [ProfessionalApplicationService]
})
export class ProfessionalApplicationModule {}
