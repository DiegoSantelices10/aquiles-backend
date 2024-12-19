import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';



@Schema()
export class Profession {
  @Prop()
  name: string

}

export const ProfessionSchema = SchemaFactory.createForClass(Profession);