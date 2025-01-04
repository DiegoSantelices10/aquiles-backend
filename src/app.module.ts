import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MessageModule } from './message/message.module';
import { CityModule } from './city/city.module';
import { ProfessionalModule } from './professional/professional.module';
import { ProfessionModule } from './profession/profession.module';
import { MongooseModule } from '@nestjs/mongoose';

const uri = "mongodb+srv://aquiles:aquiles123@aquiles.jlxuk.mongodb.net/aquilesdb";

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
