import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Station } from './station.entity';

@Entity({ name: 'pumps' })
export class Pump {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fuel_type: string;

  @Column({ type: 'float' })
  price: number;

  @Column()
  available: boolean;

  @ManyToOne(() => Station, (station) => station.pumps)
  station: Station;
}
