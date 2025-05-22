import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';



@Schema({ timestamps: true })
export class MessageClient {
  @Prop({ required: true })
  name: string;

  @Prop()
  profession: string;

  @Prop()
  address: string;

  @Prop()
  telephone: string;

  @Prop()
  email: string;

  @Prop()
  acceptTerms: boolean;

  @Prop()
  acceptPrivacyPolicy: boolean;

  createdAt?: Date;

}

export const messageClientSchema = SchemaFactory.createForClass(MessageClient);