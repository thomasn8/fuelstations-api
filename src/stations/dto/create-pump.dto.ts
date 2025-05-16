import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  IsBoolean,
  IsDefined,
  IsNotEmpty,
} from 'class-validator';

export class CreatePumpDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  fuel_type: string;

  @IsNumber()
  @IsDefined()
  @ApiProperty()
  price: number;

  @IsBoolean()
  @IsDefined()
  @ApiProperty()
  available: boolean;
}
