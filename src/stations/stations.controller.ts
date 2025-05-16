import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { StationsService } from './stations.service';
import { CreateStationDto } from './dto/create-station.dto';
import { UpdateStationDto } from './dto/update-station.dto';
import { ApiKeyGuard } from 'src/auth/api-key.guard';
import { Station } from './entities/station.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Stations')
@UseGuards(ApiKeyGuard)
@Controller('stations')
export class StationsController {
  public constructor(private readonly stationsService: StationsService) {}

  @Post()
  public async create(
    @Body() createStationDto: CreateStationDto,
  ): Promise<Station> {
    return this.stationsService.create(createStationDto);
  }

  @Get()
  public async findAll(): Promise<Station[]> {
    return this.stationsService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<Station> {
    return this.stationsService.findOne(+id);
  }

  @Patch(':id')
  public async(
    @Param('id') id: string,
    @Body() updateStationDto: UpdateStationDto,
  ): Promise<Station> {
    return this.stationsService.update(+id, updateStationDto);
  }

  @Delete(':id')
  public async remove(@Param('id') id: string): Promise<void> {
    return this.stationsService.remove(+id);
  }
}
