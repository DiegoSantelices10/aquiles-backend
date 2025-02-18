import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';



@Schema({ timestamps: true })
export class ProfessionalApplication {
  @Prop()
  name: string;

  @Prop()
  message: string;

  @Prop()
  telephone: string

  @Prop()
  profession: string

  createdAt?: Date;

}

export const ProfessionalApplicationSchema = SchemaFactory.createForClass(ProfessionalApplication);