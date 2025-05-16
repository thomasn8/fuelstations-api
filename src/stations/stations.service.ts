/* eslint-disable @typescript-eslint/require-await */

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStationDto } from './dto/create-station.dto';
import { UpdateStationDto } from './dto/update-station.dto';
import { Station } from './entities/station.entity';

@Injectable()
export class StationsService {
  // In-memory storage for users — this data will be lost on server restart.
  // Replace with database integration in the future.
  private stations: Station[] = [];

  public async create(createStationDto: CreateStationDto): Promise<Station> {
    this.stations.push(createStationDto);
    return createStationDto as Station;
  }

  public async findAll(): Promise<Station[]> {
    return this.stations;
  }

  public async findOne(id: number): Promise<Station> {
    const station = this.stations.at(id);
    if (!station) throw new NotFoundException();
    return station;
  }

  public async update(
    id: number,
    updateStationDto: UpdateStationDto,
  ): Promise<Station> {
    const station = this.stations.at(id);
    if (!station) throw new NotFoundException();
    if (updateStationDto.name) station.name = updateStationDto.name;
    if (updateStationDto.pumps.length) {
      updateStationDto.pumps.forEach(
        (pump) => (station.pumps[pump.id].price = pump.price),
      );
    }
    return this.stations[id];
  }

  public async remove(id: number): Promise<void> {
    if (id > -1 && id < this.stations.length) {
      this.stations.splice(id, 1);
    }
  }
}
