import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Professional } from './schemas/professional.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ProfessionalService {
constructor(@InjectModel(Professional.name) private professionalModel: Model<Professional>,
    private configService: ConfigService,
    private jwtService: JwtService,

) {}

async loginProfessional(userPromise: Promise<any>) {
  const user = await userPromise;
  
  const userFind: any = await this.professionalModel.findOne({ email: user.email }).exec();
    
  if (!userFind) {
    throw new UnauthorizedException('El email o contraseña son incorrectos');
  }

  const isPasswordValid = await bcrypt.compare(user.password, userFind.password);
  if (!isPasswordValid) {
    throw new UnauthorizedException('El email o contraseña son incorrectos');
  }

  const payload = { sub: userFind?._id, email: userFind.email };
  return {
    success: true,
    id: userFind._id,
    message: 'Inicio de sesión exitoso',
    email: userFind.email,
    name: userFind.name,
    access_token: this.jwtService.sign(payload),
  };
}

    async getProfessionals(): Promise<Professional[]> {
        return await this.professionalModel.find().exec();
    }

    async create(professionalData: Partial<Professional>) {
      const professional = new this.professionalModel(professionalData);
      await professional.save();
    
      const resetToken = this.generateResetToken(professional._id.toString());
    
      return { professional, resetToken };
    }

    async updatePassword(id: string, newPassword: string): Promise<Professional | null> {
      
      const professional = await this.professionalModel.findById(id);
      
      if (!professional) return null;
    
      professional.password = await bcrypt.hash(newPassword, 10);
      return professional.save();
    }
    
    
    

    async delete(id: string) {
        return this.professionalModel.findByIdAndDelete(id).exec();
    }

    async update(id: string, professional: any) {
        return this.professionalModel
      .findByIdAndUpdate(id, professional, {
        new: true,
      })
      .exec();
    }

    async findOne(id: string) {
        return this.professionalModel.findById(id).exec();
      }
    
    async findByProfession(profession: string): Promise<Professional[]> {
        return this.professionalModel.find({ profession }).exec();
    }

    async findByCities(cities: string): Promise<Professional[]> {
      return this.professionalModel.find({ cities }).exec();
    }

    async findByProfessionAndCities(profession: string, cities: string): Promise<Professional[]> {
      return this.professionalModel.find({ profession, cities }).exec();
    }

    verifyResetToken(token: string) {
      try {
        return jwt.verify(token, this.configService.get<string>('JWT_SECRET')) as { id: string };
      } catch (error) {
        return null;
      }
    }
  
    private generateResetToken(professionalId: string) {
      return jwt.sign(
        { id: professionalId },
        this.configService.get<string>('JWT_SECRET'),
        { expiresIn: '24h' },
      );
    }
}
