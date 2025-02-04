import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class Auth {

  @Prop()
  email: string;

  @Prop()
  password: string;

}

export const AuthSchema = SchemaFactory.createForClass(Auth);