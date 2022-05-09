import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { WalletController } from './wallet/wallet.controller';
import { WalletService } from './wallet/wallet.service';
import { WalletModule } from './wallet/wallet.module';
import configuration from './commons/config/configuration';
import entities from './entity';

@Module({
  imports: [AuthModule, ConfigModule.forRoot({
    load: [configuration],
  }), TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [...entities],
    synchronize: true,
  }), WalletModule]
})
export class AppModule {}
