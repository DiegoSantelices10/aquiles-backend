import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

class Message {
  @Prop({ required: true })
  senderId: Types.ObjectId;

  @Prop({ required: true })
  text: string;

  @Prop({ default: Date.now })
  timestamp: Date;
}

@Schema({ timestamps: true })
export class Consultation extends Document {
  @Prop({ required: true })
  clientId: Types.ObjectId;

  @Prop({ required: true })
  professionalId: Types.ObjectId;

  @Prop({ default: false })
  isResolved: boolean;

  @Prop({ type: [Message], default: [] })
  messages: Message[];
}

export const ConsultationSchema = SchemaFactory.createForClass(Consultation);
