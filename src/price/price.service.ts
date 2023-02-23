import { Injectable } from '@nestjs/common';
import { Cron, Interval } from '@nestjs/schedule';
import axios from 'axios';

@Injectable()
export class PriceService {
  async getPrice() {
    try {
      const resp = await axios.get(
        'https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&ids=ethereum%2Cgods-unchained',
      );
      //console.log(resp.data.ethereum.usd);
      return resp.data;
    } catch (e) {
      console.log(e);
    }
  }
}
