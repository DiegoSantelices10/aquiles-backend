import { MongooseModule } from "@nestjs/mongoose";
import { Consultation, ConsultationSchema } from "./schemas/consultation.schema";
import { ConsultationService } from "./consultation.service";
import { Module } from "@nestjs/common";
import { ConsultationController } from "./consultation.controller";


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