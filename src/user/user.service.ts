import { Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
constructor(@InjectModel(User.name) private userModel: Model<User>) {}

async create(userData: Promise<User>) {
  const hashedPassword = await bcrypt.hash((await userData).password, 10);
  const newUser = new this.userModel({ name: (await userData).name, email: (await userData).email, password: hashedPassword });
  return newUser.save();
}

async findOneByEmail(email: string): Promise<User | null> {
      return this.userModel.findOne({ email }).exec();
    }
    
}
