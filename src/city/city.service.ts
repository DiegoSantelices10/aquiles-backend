import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { City } from './schemas/city.schema';
import { Model } from 'mongoose';

@Injectable()
export class CityService {
    constructor(@InjectModel(City.name) private cityModel: Model<City>) {}

    async getCities(): Promise<City[]> {
        return await this.cityModel.find().exec();
    }

    async create(city: Promise<City>) {
        const createdCity = new this.cityModel(city);
        return createdCity.save();
    }

    async delete(id: string) {
        return this.cityModel.findByIdAndDelete(id).exec();
    }

    async update(id: string, todo: any) {
        return this.cityModel
      .findByIdAndUpdate(id, todo, {
        new: true,
      })
      .exec();
    }

    async findOne(id: string) {
        return this.cityModel.findById(id).exec();
      }
}
