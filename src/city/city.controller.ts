import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CityService } from './city.service';

@Controller('city')
export class CityController {
    constructor(private readonly cityService: CityService) { }

    @Get()
    getCities() {
        return this.cityService.getCities();
    }

    @Get(':id')
    getCityById(@Param('id') id: string) {
        return this.cityService.findOne(id);
    }

    @Post()
    async create(@Body() createCity: any) {
        return this.cityService.create(createCity);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.cityService.delete(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateCity: any) {
        return this.cityService.update(id, updateCity);
    }
}
