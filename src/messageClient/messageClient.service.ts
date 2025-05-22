import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MessageClient } from './schemas/messageClient.schema';

@Injectable()
export class MessageClientService {
    constructor(@InjectModel(MessageClient.name) private messageClientModel: Model<MessageClient>) {}

    async getMessages(): Promise<MessageClient[]> {
        return await this.messageClientModel.find().exec();
    }

    async create(message: MessageClient) {
        const createdMessage = new this.messageClientModel(message);
        return createdMessage.save();
    }

    async delete(id: string) {
        return this.messageClientModel.findByIdAndDelete(id).exec();
    }

    async update(id: string, message: any) {
        return this.messageClientModel
      .findByIdAndUpdate(id, message, {
        new: true,
      })
      .exec();
    }

    async findOne(id: string) {
        return this.messageClientModel.findById(id).exec();
      }
}
