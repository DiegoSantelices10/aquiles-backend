import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Consultation } from './schemas/consultation.schema';

@Injectable()
export class ConsultationService {
    constructor(@InjectModel(Consultation.name) private consultationModel: Model<Consultation>) {}

    async getMessages(): Promise<Consultation[]> {
        return await this.consultationModel.find().exec();
    }

    async create(message: Consultation) {
        const createdMessage = new this.consultationModel(message);
        return createdMessage.save();
    }

    async delete(id: string) {
        return this.consultationModel.findByIdAndDelete(id).exec();
    }

    async update(id: string, message: any) {
        return this.consultationModel
      .findByIdAndUpdate(id, message, {
        new: true,
      })
      .exec();
    }

    async findOne(id: string) {
        return this.consultationModel.findById(id).exec();
      }
}
