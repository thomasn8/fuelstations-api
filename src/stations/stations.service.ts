import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateStationDto } from './dto/create-station.dto';
import { UpdateStationDto } from './dto/update-station.dto';
import { Station } from './entities/station.entity';
import { Pump } from './entities/pump.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class StationsService {
  public constructor(
    @InjectRepository(Station)
    private readonly stationRepository: Repository<Station>,
    @InjectRepository(Pump)
    private readonly pumpRepository: Repository<Pump>,
  ) {}

  public async create(createStationDto: CreateStationDto): Promise<Station> {
    if (await this.isConflict(createStationDto)) throw new ConflictException();
    const newStation = this.stationRepository.create(createStationDto);
    newStation.id = await this.createCustomId(createStationDto);
    return await this.stationRepository.save(newStation);
  }

  public async findAll(): Promise<Station[]> {
    return this.stationRepository.find();
  }

  public async findOne(id: string): Promise<Station> {
    const station = await this.stationRepository.findOneBy({
      id: id,
    });
    if (station === null) throw new NotFoundException();
    return station;
  }

  public async update(
    id: string,
    updateStationDto: UpdateStationDto,
  ): Promise<Station> {
    const station = await this.findOne(id);
    if (await this.isConflict(updateStationDto)) throw new ConflictException();
    if (updateStationDto.name) station.name = updateStationDto.name;
    if (updateStationDto.pumps != undefined) {
      if (updateStationDto.pumps.length < 1) throw new BadRequestException();
      updateStationDto.pumps.forEach((updatePumpDto) => {
        const pump = station.pumps.find((pump) => pump.id === updatePumpDto.id);
        if (pump === undefined) throw new BadRequestException();
        pump.price = updatePumpDto.price;
      });
    }

    return await this.stationRepository.save(station);
  }

  public async remove(id: string): Promise<void> {
    const station = await this.findOne(id);
    for (const pump of station.pumps) {
      await this.pumpRepository.delete(pump.id);
    }
    await this.stationRepository.delete(station.id);
  }

  private async isConflict(
    dto: CreateStationDto | UpdateStationDto,
  ): Promise<boolean> {
    const whereCondition: any[] = [{ name: dto.name }];
    if (dto instanceof CreateStationDto) {
      whereCondition.push({
        address: dto.address,
      });
    }
    const station = await this.stationRepository.findOne({
      where: whereCondition,
    });
    return station !== null;
  }

  private async createCustomId(
    createStationDto: CreateStationDto,
  ): Promise<string> {
    const stationCount = await this.stationRepository.count();
    const firstWordOfName = createStationDto.name.split(' ')[0].toUpperCase();
    return `${firstWordOfName}_${stationCount + 100000}`;
  }
}
