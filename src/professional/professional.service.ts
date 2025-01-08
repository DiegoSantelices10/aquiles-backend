import { Injectable } from '@nestjs/common';
import { Professional } from './schemas/professional.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProfessionalService {
constructor(@InjectModel(Professional.name) private professionalModel: Model<Professional>) {}

    async getProfessionals(): Promise<Professional[]> {
        return await this.professionalModel.find().exec();
    }

    async create(professional: Promise<Professional>) {
        const createdProfessional = new this.professionalModel(professional);
        return createdProfessional.save();
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
