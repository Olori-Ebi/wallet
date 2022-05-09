import { Currency, Gateway, Status } from 'src/enum/index.enum';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  transactionId: number;

  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    nullable: false,
  })
  email: string;

  @Column()
  phone: string;

  @Column({
    nullable: false,
  })
  amount: number;

  @Column({ nullable: false, type: 'enum', enum: Currency })
  currency: Currency;

  @Column({ nullable: false, type: 'enum', enum: Status })
  paymentStatus: Status;

  @Column({ nullable: false, type: 'enum', enum: Gateway })
  paymentGateway: Gateway;

  @OneToOne(() => User, (user) => user.transaction, { eager: true })
  @JoinColumn()
  user: User;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created: Date;
}
