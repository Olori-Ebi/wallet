import { Currency, Status } from 'src/enum/index.enum';
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
export class WalletTransaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    default: 0,
  })
  amount: number;

  @Column()
  isInFlow: boolean;

  @Column({
    default: 'flutterwave',
  })
  paymentMethod: string;

  @Column({ nullable: false, type: 'enum', enum: Currency })
  currency: Currency;

  @Column({ nullable: false, type: 'enum', enum: Status })
  status: Status;

  @OneToOne(() => User, (user) => user.walletTransaction, { eager: true })
  @JoinColumn()
  user: User;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created: Date;
}
