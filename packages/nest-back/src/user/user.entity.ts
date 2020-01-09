import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 80, unique: true })
  email: string;

  @Column({ length: 95 })
  password: string;

  @Column({ length: 120 })
  name: string;
}