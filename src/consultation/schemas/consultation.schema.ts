import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';



@Schema({ timestamps: true })
export class Consultation {
  @Prop({ required: true })
  name: string;

  @Prop()
  professionalName: string;

  @Prop({ required: true })
  message: string;

  @Prop({ required: true })
  telephone: string

  @Prop({ required: true })
  profession: string

  createdAt?: Date;

}

export const ConsultationSchema = SchemaFactory.createForClass(Consultation);