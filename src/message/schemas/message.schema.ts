import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';



@Schema()
export class Message {
  @Prop()
  name: string;

  @Prop()
  message: string;

  @Prop()
  telephone: string

  @Prop()
  profession: string

}

export const MessageSchema = SchemaFactory.createForClass(Message);