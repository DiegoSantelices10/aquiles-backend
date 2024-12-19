import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

class Image {
    @Prop()
    url: string;
  
    @Prop()
    altText?: string;
  }
  
  class City {
    @Prop()
    name: string;
  }


@Schema()
export class Professional {
  @Prop()
  name: string;

  @Prop()
  profession: string

  @Prop()
  email: string

  @Prop()
  telephone: string

  @Prop()
  dni: string

  @Prop({ type: [City], default: [] })
  cities: City[];

  @Prop()
  description: string

  @Prop({ type: [Image], default: [] })
  image: Image[];
}

export const ProfessionalSchema = SchemaFactory.createForClass(Professional);