import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  customerId: string;

  @Column({ default: 'pending' })
  status: 'pending' | 'paid' | 'cancelled';

  @Column('decimal')
  totalPrice: number;

  @CreateDateColumn()
  createdAt: Date;
}
