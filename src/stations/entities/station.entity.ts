import { Pump } from './pump.entity';

export class Station {
  // id: string;
  name: string;
  address: string;
  city: string;
  latitude: number;
  longitude: number;
  pumps: Pump[];
}
