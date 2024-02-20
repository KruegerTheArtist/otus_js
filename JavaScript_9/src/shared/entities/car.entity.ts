import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'cars' })
export class Car {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: true,
  })
  brand: string;

  @Column({
    nullable: true,
  })
  model: string;

  @ManyToMany(() => User, (user) => user.cars, { cascade: true })
  user: User;
}
