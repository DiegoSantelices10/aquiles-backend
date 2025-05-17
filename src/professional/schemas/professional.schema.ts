import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

class Image {
    @Prop()
    url: string;

    @Prop()
    public_id: string

    @Prop()
    fileName: string

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

  @Prop({ type: Image })
  imageUser: Image

  @Prop({ type: [Image], default: [] })
  images: Image[];

  @Prop()
  acceptTerms: boolean;

  @Prop()
  acceptPrivacyPolicy: boolean;

  @Prop()
  registrationNumber: string;

  @Prop()
  reasonSocial: string;
}

export const ProfessionalSchema = SchemaFactory.createForClass(Professional);