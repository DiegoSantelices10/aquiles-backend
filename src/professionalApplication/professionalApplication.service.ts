import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProfessionalApplication } from './schemas/professionalApplication.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProfessionalApplicationService {
    constructor(@InjectModel(ProfessionalApplication.name) private professionalApplicationModel: Model<ProfessionalApplication>) {}

    async getMessages(): Promise<ProfessionalApplication[]> {
        return await this.professionalApplicationModel.find().exec();
    }

    async create(message: Promise<ProfessionalApplication>) {
        const createdMessage = new this.professionalApplicationModel(message);
        return createdMessage.save();
    }

    async delete(id: string) {
        return this.professionalApplicationModel.findByIdAndDelete(id).exec();
    }

    async update(id: string, message: any) {
        return this.professionalApplicationModel
      .findByIdAndUpdate(id, message, {
        new: true,
      })
      .exec();
    }

    async findOne(id: string) {
        return this.professionalApplicationModel.findById(id).exec();
      }
}
