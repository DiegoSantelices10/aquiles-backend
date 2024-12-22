import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MessageModule } from './message/message.module';
import { CityModule } from './city/city.module';
import { ProfessionalModule } from './professional/professional.module';
import { ProfessionModule } from './profession/profession.module';
import { MongooseModule } from '@nestjs/mongoose';

const uri = `mongodb://${process.env.USER_MONGODB}:${process.env.PASS_MONGODB}@${process.env.CLUSTER_MONGODB}/${process.env.DATA_BASE_MONGODB}?retryWrites=true&w=majority`;

@Module({
  imports: [
    ProfessionModule, 
    ProfessionalModule, 
    CityModule, 
    MessageModule, 
    MongooseModule.forRoot(uri)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
