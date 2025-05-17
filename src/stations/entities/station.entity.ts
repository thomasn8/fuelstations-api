import { Pump } from './pump.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity({ name: 'stations' })
export class Station {
  @PrimaryColumn()
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  @Column({ unique: true })
  address: string;

  @Column()
  city: string;

  @Column({ type: 'float' })
  latitude: number;

  @Column({ type: 'float' })
  longitude: number;

  @OneToMany(() => Pump, (pump) => pump.station, { eager: true, cascade: true })
  pumps: Pump[];
}
