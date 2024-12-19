import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class City {
  @Prop()
  name: string;

}

export const CitySchema = SchemaFactory.createForClass(City);