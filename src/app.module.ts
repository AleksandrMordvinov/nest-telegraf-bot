import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';

import { AppUpdate } from './app.update';
import { sessionMiddleware } from './middleware/session.middleware';
import { PriceService } from './price/price.service';

import { ScheduleModule } from '@nestjs/schedule';
import { GetCardsETH } from './cards/cardsETH.service';
import { PostController } from './app.controlers';
import { GetCardsGODS } from './cards/cardsGODS.service';
import { GetCards_ETH } from './cards/getCardsETH.service';
import { GetCards_GODS } from './cards/getCardsGODS.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TelegrafModule.forRoot({
      token: '6021441224:AAHMnfCvCrsYzSkcHcigsxA5InOWXA4t9RY',
      middlewares: [sessionMiddleware],
    }),
  ],
  controllers: [PostController],
  providers: [
    AppUpdate,
    PriceService,
    GetCardsETH,
    GetCardsGODS,
    GetCards_ETH,
    GetCards_GODS,
  ],
})
export class AppModule {}
