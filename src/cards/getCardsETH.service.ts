import { Injectable } from '@nestjs/common';

@Injectable()
export class GetCards_ETH {
  async getCardsETH(cardsETH, cards_ETH_New, priceUSD, cardsGODS, priceGODS) {
    try {
      let cards = [];

      cards_ETH_New &&
        cardsETH.map((item) => {
          let card = cards_ETH_New.find(
            (el) => el.name === item.name && el.quality === item.quality,
          );

          if (card === undefined) return;
          const old_price = Number(item.price) * Number(priceUSD);
          const new_price = Number(card.price) * Number(priceUSD);
          const new_price_bot = new_price.toFixed(2);
          const old_price_bot = old_price.toFixed(2);
          const procent1 = 1 - new_price / old_price;
          const procent = (procent1 * 100).toFixed(2);

          if (
            old_price > new_price &&
            old_price > new_price + new_price * 0.2
          ) {
            let meteoritePriceETH = 0;
            let shadowPriceETH = 0;
            let goldPriceETH = 0;
            let diamondPriceETH = 0;
            let meteoritePriceGODS = 0;
            let shadowPriceGODS = 0;
            let goldPriceGODS = 0;
            let diamondPriceGODS = 0;
            cardsETH.forEach((it) => {
              if (card.name === it.name) {
                if (it.quality === 'Meteorite') {
                  meteoritePriceETH = it.price;
                } else if (it.quality === 'Shadow') {
                  shadowPriceETH = it.price;
                } else if (it.quality === 'Gold') {
                  goldPriceETH = it.price;
                } else if (it.quality === 'Diamond') {
                  diamondPriceETH = it.price;
                }
              }
            });

            cardsGODS.forEach((it) => {
              if (card.name === it.name) {
                if (it.quality === 'Meteorite') {
                  meteoritePriceGODS = it.price;
                } else if (it.quality === 'Shadow') {
                  shadowPriceGODS = it.price;
                } else if (it.quality === 'Gold') {
                  goldPriceGODS = it.price;
                } else if (it.quality === 'Diamond') {
                  diamondPriceGODS = it.price;
                }
              }
            });

            cards.push({
              proto: item.proto,
              quality: item.quality,
              rarity: item.rarity,
              set: item.set,
              old_price,
              new_price,
              procent,
              name: item.name,
              image: item.image,
              price: card.price,
              meteoritePriceETH: meteoritePriceETH * Number(priceUSD),
              shadowPriceETH: shadowPriceETH * Number(priceUSD),
              goldPriceETH: goldPriceETH * Number(priceUSD),
              diamondPriceETH: diamondPriceETH * Number(priceUSD),
              meteoritePriceGODS: meteoritePriceGODS * Number(priceGODS),
              shadowPriceGODS: shadowPriceGODS * Number(priceGODS),
              goldPriceGODS: goldPriceGODS * Number(priceGODS),
              diamondPriceGODS: diamondPriceGODS * Number(priceGODS),
            });
            item.price = card.price;
          }
        });

      return await cards;
    } catch (er) {
      console.log(er + ' ' + '22222');
    }
  }
}
