import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

class Image {
    @Prop()
    url: string;

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
  password: string

  @Prop()
  resetPasswordToken?: string; // Opcional, para restablecer la contraseña

  @Prop()
  resetPasswordExpires?: Date; // Fecha de expiración del token

  @Prop()
  telephone: string

  @Prop()
  dni: string

  @Prop()
  cities: string[];

  @Prop()
  description: string

  @Prop({ type: [Image], default: [] })
  image: Image[];
}

export const ProfessionalSchema = SchemaFactory.createForClass(Professional);