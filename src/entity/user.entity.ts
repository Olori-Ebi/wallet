import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Transaction } from './transaction.entity';
import { WalletTransaction } from './wallet-transaction.entity';
import { Wallet } from './wallet.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToOne(() => Wallet, wallet => wallet.user, { eager: false })
  wallet: Wallet

  @OneToOne(() => WalletTransaction, walletTransaction => walletTransaction.user, { eager: false })
  walletTransaction: WalletTransaction

  @OneToOne(() => Transaction, transaction => transaction.user, { eager: false })
  transaction: Transaction
}
