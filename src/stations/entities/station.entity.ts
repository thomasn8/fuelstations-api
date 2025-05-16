import { Pump } from './pump.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'stations' })
export class Station {
  @PrimaryGeneratedColumn('uuid') // TODO: concat the name (first word) with a number (the lenght of the stations + 1)
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
