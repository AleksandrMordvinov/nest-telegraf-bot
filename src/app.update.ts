import { Cron, Interval, SchedulerRegistry } from '@nestjs/schedule';
import axios from 'axios';
import { Ctx, Hears, InjectBot, Start, Update } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';
import { GetCardsETH } from './cards/cardsETH.service';
import { GetCardsGODS } from './cards/cardsGODS.service';
import { GetCards_ETH } from './cards/getCardsETH.service';
import { GetCards_GODS } from './cards/getCardsGODS.service';

import { PriceService } from './price/price.service';

let priceUSD = 1700;
let priceGODS = 0.3;
let cardsETH = [];

let cardsGODS = [];

@Update()
export class AppUpdate {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly priceService: PriceService,
    private readonly getCardsETH: GetCardsETH,
    private readonly getCardsGODS: GetCardsGODS,
    private readonly getCards_ETH: GetCards_ETH,
    private readonly getCards_GODS: GetCards_GODS,
  ) {}

  @Start()
  async start(ctx: Context) {
    const interval = setInterval(async () => {
      try {
        //await ctx.reply('start');
        const cards_ETH_New = await this.getCardsETH.getCardsETH();
        const cards_GODS_New = await this.getCardsGODS.getCardsGODS();

        let card = await this.getCards_ETH.getCardsETH(
          cardsETH,
          cards_ETH_New,
          priceUSD,
          cardsGODS,
          priceGODS,
        );
        let cardGODS = await this.getCards_GODS.getCardsGODS(
          cardsETH,
          cards_GODS_New,
          priceUSD,
          cardsGODS,
          priceGODS,
        );
        // console.log(card);

        await card.map(async (it) => {
          try {
            await ctx.replyWithPhoto(it.image, {
              caption: `Ethereum  procent--${it.procent}%
          old_price--${it.old_price.toFixed(2)}$
          new_price--${it.new_price.toFixed(2)}$
          ETH----${it.meteoritePriceETH.toFixed(
            2,
          )}--${it.shadowPriceETH.toFixed(2)}--${it.goldPriceETH.toFixed(
                2,
              )}--${it.diamondPriceETH.toFixed(2)}
           GODS--${it.meteoritePriceGODS.toFixed(
             2,
           )}--${it.shadowPriceGODS.toFixed(2)}--${it.goldPriceGODS.toFixed(
                2,
              )}--${it.diamondPriceGODS.toFixed(2)}
          `,
            });
          } catch (er) {
            console.log(er + ' ' + 'sdf');
          }
        });
        await cardGODS.map(async (it) => {
          try {
            await ctx.replyWithPhoto(it.image, {
              caption: `GODS  procent--${it.procent}%
          old_price--${it.old_price.toFixed(2)}$
          new_price--${it.new_price.toFixed(2)}$
          GODS--${it.meteoritePriceGODS.toFixed(
            2,
          )}--${it.shadowPriceGODS.toFixed(2)}--${it.goldPriceGODS.toFixed(
                2,
              )}--${it.diamondPriceGODS.toFixed(2)}
          ETH----${it.meteoritePriceETH.toFixed(
            2,
          )}--${it.shadowPriceETH.toFixed(2)}--${it.goldPriceETH.toFixed(
                2,
              )}--${it.diamondPriceETH.toFixed(2)}
          `,
            });
          } catch (er) {
            console.log(er + ' ' + 'sdf');
          }
        });
      } catch (er) {
        console.log(er + '' + 'sdgdsfgdfh');
      }
    }, 20000);
  }

  @Hears('price')
  async onHelloHears(ctx: Context) {
    await ctx.reply(`data: `);
    const data = await this.priceService.getPrice();
    priceUSD = data.ethereum.usd;
    priceGODS = data['gods-unchained'].usd;
    await ctx.reply(`data: ${priceUSD!}`);
    await ctx.reply(`data: ${priceGODS!}`);
  }
  @Hears('cards')
  async getsCardsETH(ctx: Context) {
    const cardETH = await this.getCardsETH.getCardsETH();
    const cardGODS = await this.getCardsGODS.getCardsGODS();

    cardsETH.length = 0;
    cardsGODS.length = 0;
    cardsETH.push(...cardETH);
    cardsGODS.push(...cardGODS);
    await ctx.reply(`${cardsETH && cardsGODS && 'Ready'}`);
  }
}
