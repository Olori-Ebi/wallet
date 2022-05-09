import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Transaction } from 'src/entity/transaction.entity';
import { User } from 'src/entity/user.entity';
import { WalletTransaction } from 'src/entity/wallet-transaction.entity';
import { Wallet } from 'src/entity/wallet.entity';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([ User, Wallet, WalletTransaction, Transaction])],
  controllers: [WalletController],
  providers: [WalletService],
})
export class WalletModule {}
