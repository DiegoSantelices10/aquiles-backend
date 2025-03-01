import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Professional } from './schemas/professional.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ProfessionalService {
constructor(@InjectModel(Professional.name) private professionalModel: Model<Professional>,
    private configService: ConfigService,
    private jwtService: JwtService,

) {}

    async getProfessionals(): Promise<Professional[]> {
        return await this.professionalModel.find().exec();
    }

    async create(professionalData: Partial<Professional>) {
      const professional = new this.professionalModel(professionalData);
      await professional.save();
    
      return { professional };
    }

    async delete(id: string) {
        return this.professionalModel.findByIdAndDelete(id).exec();
    }

    async update(id: string, professional: any) {
        return this.professionalModel
      .findByIdAndUpdate(id, professional, {
        new: true,
      })
      .exec();
    }

    async findOne(id: string) {
        return this.professionalModel.findById(id).exec();
      }
    
    async findByProfession(profession: string): Promise<Professional[]> {
        return this.professionalModel.find({ profession }).exec();
    }

    async findByCities(cities: string): Promise<Professional[]> {
      return this.professionalModel.find({ cities }).exec();
    }

    async findByProfessionAndCities(profession: string, cities: string): Promise<Professional[]> {
      return this.professionalModel.find({ profession, cities }).exec();
    }

  

}
