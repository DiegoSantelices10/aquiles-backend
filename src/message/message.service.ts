import { Get, Injectable, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from './schemas/message.schema';
import { Model } from 'mongoose';

@Injectable()
export class MessageService {
    constructor(@InjectModel(Message.name) private messageModel: Model<Message>) {}

    async getMessages(): Promise<Message[]> {
        return await this.messageModel.find().exec();
    }

    async create(message: Promise<Message>) {
        const createdMessage = new this.messageModel(message);
        return createdMessage.save();
    }

    async delete(id: string) {
        return this.messageModel.findByIdAndDelete(id).exec();
    }

    async update(id: string, message: any) {
        return this.messageModel
      .findByIdAndUpdate(id, message, {
        new: true,
      })
      .exec();
    }

    async findOne(id: string) {
        return this.messageModel.findById(id).exec();
      }
}
