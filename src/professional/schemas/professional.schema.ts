import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

class Image {
    @Prop()
    url: string;

    @Prop()
    public_id: string
  
  }
  

@Schema({ timestamps: true })
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

  @Prop()
  city: string;

  @Prop()
  description: string

  @Prop()
  imageUser: {
    url: string;
    public_id: string
  }

  @Prop({ type: [Image], default: [] })
  image: Image[];
}

export const ProfessionalSchema = SchemaFactory.createForClass(Professional);