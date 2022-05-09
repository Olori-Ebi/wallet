import {
  Controller,
  Get,
  Query,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import axios from 'axios';
import * as path from 'path';
import { QueryDto } from 'src/dto/filter.dto';
import { WalletService } from './wallet.service';

// @UseGuards(AuthGuard())
@Controller()
export class WalletController {
  constructor(private walletService: WalletService) {}

  @Get('/pay')
  Pay(@Request() req, @Response() res) {
    res.sendFile(path.join(__dirname + '/index.html'));
  }

  @Get('/response')
  async getResponse(@Query() queryDto: QueryDto, @Response() res) {
    const { transaction_id } = queryDto;

    const url = `https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`;

    const response = await axios({
      url,
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `${process.env.FLUTTERWAVE_V3_SECRET_KEY}`,
      },
    });

    const { status, currency, id, amount, customer } = response.data.data;

   await this.walletService.validateUser(status, currency, id, amount, customer, res);
 

    // check if customer exist in our database
//   const user = await User.findOne({ email: customer.email });
  }
}
