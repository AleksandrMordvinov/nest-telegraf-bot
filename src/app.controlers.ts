import { Controller, Get } from '@nestjs/common';
import { GetCardsETH } from './cards/cardsETH.service';
import { GetCardsGODS } from './cards/cardsGODS.service';
let cardsETH = [];
@Controller('cards')
export class PostController {
  constructor(
    private getCardsETH: GetCardsETH,
    private getCardsGODS: GetCardsGODS,
  ) {}
  @Get()
  async getAllCards() {
    const data = await this.getCardsETH.getCardsETH();
    cardsETH.length = 0;
    cardsETH.push(...data);
    // console.log(data);
    return await cardsETH;
  }
}
