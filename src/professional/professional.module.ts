import { Module } from '@nestjs/common';
import { ProfessionalController } from './professional.controller';
import { ProfessionalService } from './professional.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Professional, ProfessionalSchema } from './schemas/professional.schema';

@Module({
  imports: [
          MongooseModule.forFeature([
            {
              name: Professional.name,
              schema: ProfessionalSchema,
            },
          ]),
        ],
  controllers: [ProfessionalController],
  providers: [ProfessionalService]
})
export class ProfessionalModule {}
