import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsArray, IsOptional, ValidateNested } from 'class-validator';
import { UpdatePumpDto } from './update-pump.dto';

export class UpdateStationDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  name: string;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdatePumpDto)
  @ApiPropertyOptional({ type: UpdatePumpDto, isArray: true })
  pumps: UpdatePumpDto[];
}
