import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profession } from './schemas/profession.schema';

@Injectable()
export class ProfessionService {
constructor(@InjectModel(Profession.name) private professionModel: Model<Profession>) {}

    async getProfessions(): Promise<Profession[]> {
        return await this.professionModel.find().exec();
    }

    async create(profession: Promise<Profession>) {
        const createdProfession = new this.professionModel(profession);
        return createdProfession.save();
    }

    async delete(id: string) {
        return this.professionModel.findByIdAndDelete(id).exec();
    }

    async update(id: string, profession: any) {
        return this.professionModel
      .findByIdAndUpdate(id, profession, {
        new: true,
      })
      .exec();
    }

    async findOne(id: string) {
        return this.professionModel.findById(id).exec();
      }
}
