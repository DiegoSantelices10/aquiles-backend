import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MessageModule } from './message/message.module';
import { CityModule } from './city/city.module';
import { ProfessionalModule } from './professional/professional.module';
import { ProfessionModule } from './profession/profession.module';
import { MongooseModule } from '@nestjs/mongoose';

const uri = "mongodb+srv://aquiles:aquiles123@aquiles.jlxuk.mongodb.net/aquilesdb?directConnection=true";

@Module({
  imports: [ProfessionModule, ProfessionalModule, CityModule, MessageModule, MongooseModule.forRoot(uri, 
    {
      connectionFactory: (connection) => {
        connection.on('connected', () => {
          console.log('Successfully connected to MongoDB');
        });
        connection.on('error', (err) => {
          console.error('MongoDB connection error:', err);
        });
        connection.on('disconnected', () => {
          console.warn('MongoDB disconnected');
        });
        return connection;
      },
    },
  )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
