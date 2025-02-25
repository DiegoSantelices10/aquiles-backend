import { MongooseModule } from "@nestjs/mongoose";
import { Consultation, ConsultationSchema } from "./schemas/consultation.schema";
import { ConsultationController } from "./consultation.controller";
import { ConsultationService } from "./consultation.service";
import { Module } from "@nestjs/common";


@Module({
    imports: [
        MongooseModule.forFeature([
            { 
                name: Consultation.name, 
                schema: ConsultationSchema 
            },
        ]),
    ],
    controllers: [ConsultationController],
    providers: [ConsultationService],
})

export class ConsultationModule {}