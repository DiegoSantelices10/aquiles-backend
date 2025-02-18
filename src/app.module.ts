import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ProfessionalApplicationModule } from './professionalApplication/professionalApplication.module';
import { CityModule } from './city/city.module';
import { ProfessionalModule } from './professional/professional.module';
import { ProfessionModule } from './profession/profession.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";


@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI), 
    UserModule,
    AuthModule,
    ProfessionModule, 
    ProfessionalModule, 
    CityModule, 
    ProfessionalApplicationModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
