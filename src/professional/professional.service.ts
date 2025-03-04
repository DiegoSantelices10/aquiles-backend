import { Injectable, NotFoundException } from '@nestjs/common';
import { Professional } from './schemas/professional.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProfessionalService {
constructor(@InjectModel(Professional.name) private professionalModel: Model<Professional>
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

    async findByCities(city: string): Promise<Professional[]> {
      return this.professionalModel.find({ city }).exec();
    }

    async findByProfessionAndCities(profession: string, city: string): Promise<Professional[]> {
      return this.professionalModel.find({ profession, city }).exec();
    }

    async removeImage(userId: string, removeImageDto: any) {
      const { public_id } = removeImageDto;
  
      const user = await this.findOne(userId);
      if (!user) {
        throw new NotFoundException('Usuario no encontrado');
      }
  
      user.images = user.images.filter(image => image.public_id !== public_id);
  
      await user.save();
      return user;
    }

  

}
