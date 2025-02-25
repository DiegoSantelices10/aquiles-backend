import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Consultation } from './schemas/consultation.schema';

@Injectable()
export class ConsultationService {
  constructor(
    @InjectModel(Consultation.name) private consultationModel: Model<Consultation>,
  ) {}

  // Crear una consulta
  async create(createDto: any): Promise<Consultation> {
    const consultation = new this.consultationModel(createDto);
    return consultation.save();
  }

  // Obtener una consulta por ID
  async findByUserId(id: string): Promise<Consultation> {
    const consultation = await this.consultationModel
      .findOne({
        $or: [
          { clientId: id },
          { professionalId: id },
        ],
      })
      .exec();
  
    if (!consultation) {
      throw new NotFoundException('Consulta no encontrada');
    }
  
    return consultation;
  }
  // Enviar un mensaje dentro de la consulta
  async addMessage(consultationId: string, senderId: string, text: string): Promise<Consultation> {
    return this.consultationModel.findByIdAndUpdate(
      consultationId,
      { $push: { 
        messages: { 
          senderId, text, 
          timestamp: new Date().toString() 
        }}},
      { new: true },
    ).exec();
  }
}
