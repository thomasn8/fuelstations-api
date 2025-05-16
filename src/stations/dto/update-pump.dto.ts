import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNumber } from 'class-validator';

export class UpdatePumpDto {
  @IsNumber()
  @IsDefined()
  @ApiProperty()
  id: number;

  @IsNumber()
  @IsDefined()
  @ApiProperty()
  price: number;
}
