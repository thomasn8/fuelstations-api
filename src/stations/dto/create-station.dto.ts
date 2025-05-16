import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNumber,
  IsString,
  IsArray,
  IsDefined,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { CreatePumpDto } from './create-pump.dto';

export class CreateStationDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  address: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  city: string;

  @IsNumber()
  @IsDefined()
  @ApiProperty()
  latitude: number;

  @IsNumber()
  @IsDefined()
  @ApiProperty()
  longitude: number;

  @IsArray()
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => CreatePumpDto)
  @ApiProperty({ type: CreatePumpDto, isArray: true })
  pumps: CreatePumpDto[];
}
