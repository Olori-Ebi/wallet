import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import { Customer } from 'src/dto/customer.dto';
import { Transaction } from 'src/entity/transaction.entity';
import { User } from 'src/entity/user.entity';
import { WalletTransaction } from 'src/entity/wallet-transaction.entity';
import { Wallet } from 'src/entity/wallet.entity';
import { Currency, Gateway, Status } from 'src/enum/index.enum';
import { Repository } from 'typeorm';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(User) private userModel: Repository<User>,
    @InjectRepository(Wallet) private walletModel: Repository<Wallet>,
    @InjectRepository(WalletTransaction)
    private walletTransactionModel: Repository<WalletTransaction>,
    @InjectRepository(Transaction)
    private transactionModel: Repository<Transaction>,
  ) {}
  async validateUser(
    status: Status,
    currency: Currency,
    id: number,
    amount: number,
    customer: Customer,
    res: Response
  ) {
    // check if customer exist in our database
    const user = await this.userModel.findOne({ email: customer.email });

    // check if user have a wallet, else create wallet
    const wallet = await this.validateUserWallet(user);

    // create wallet transaction
    await this.createWalletTransaction(user, status, currency, amount);

    // create transaction
    await this.createTransaction(user, id, status, currency, amount, customer);
    await this.updateWallet(user, amount);

    return res.status(200).send({
        response: "wallet funded successfully",
        data: wallet,
      });
  }

  async validateUserWallet(user: User) {
    try {
      // check if user have a wallet, else create wallet
      const userWallet = await this.walletModel.findOne({
        where: { id: user.id },
      });

      // If user wallet doesn't exist, create a new one
      if (!userWallet) {
        // create wallet
        const wallet = this.walletModel.create({
          user,
        });
        await this.walletModel.save(wallet);
        return wallet;
      }
      return userWallet;
    } catch (error) {
      console.log(error);
    }
  }

  async createWalletTransaction(
    user: User,
    status: Status,
    currency: Currency,
    amount: number,
  ) {
    try {
      // create wallet transaction
      const walletTransaction = this.walletTransactionModel.create({
        amount,
        isInFlow: true,
        currency,
        status,
        user,
      });

      await this.walletTransactionModel.save(walletTransaction);
      return walletTransaction;
    } catch (error) {
      console.log(error);
    }
  }

  async createTransaction(
    user: User,
    id: number,
    status: Status,
    currency: Currency,
    amount: number,
    customer: Customer,
  ) {
    try {
      // create transaction
      const transaction = this.transactionModel.create({
        user,
        transactionId: id,
        name: customer.name,
        email: customer.email,
        phone: customer.phone_number,
        amount,
        currency,
        paymentStatus: status,
        paymentGateway: Gateway.FLUTTERWAVE,
      });

      await this.transactionModel.save(transaction);
      return transaction;
    } catch (error) {
      console.log(error);
    }
  }

  async updateWallet(user: User, amount: number) {
    try {
        const wallet = await this.walletModel.findOne({
            where: { id: user.id },
        })
        wallet.balance = amount;

        await this.walletModel.save(wallet);
        return wallet;
      } catch (error) {
        console.log(error);
      }
  }
}
