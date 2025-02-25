import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { ConsultationService } from './consultation.service';
import { Consultation } from './schemas/consultation.schema';

@Controller('consultation')
export class ConsultationController {
  constructor(private readonly consultationService: ConsultationService) {}

  @Post()
  async create(@Body() createDto: any): Promise<Consultation> {
    return this.consultationService.create(createDto);
  }

  @Get(':id')
  async findByUserId(@Param('id') id: string): Promise<Consultation> {
    return this.consultationService.findByUserId(id);
  }

  @Put(':consultationId/messages')
  async addMessage(
    @Param('consultationId') consultationId: string,
    @Body('senderId') senderId: string,
    @Body('text') text: string,
  ): Promise<Consultation> {
    return this.consultationService.addMessage(consultationId, senderId, text);
  }
}
