import { Transaction } from "./transaction.entity";
import { User } from "./user.entity";
import { WalletTransaction } from "./wallet-transaction.entity";
import { Wallet } from "./wallet.entity";

const entities = [User, WalletTransaction, Wallet, Transaction];

export default entities;