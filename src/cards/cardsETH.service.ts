import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class GetCardsETH {
  async getCardsETH() {
    try {
      const arrCardsETH = [];
      const resp = await axios.get(
        'https://marketplace-api.immutable.com/v1/stacked-assets/0xacb3c6a43d15b907e8433077b6d38ae40936fe2c/search?direction=asc&order_by=buy_quantity_with_fees&page_size=5200&token_type=ETH',
      );
      arrCardsETH.length = 0;
      resp.data.result.map((element) => {
        let card = {
          proto: element.asset_stack_properties.proto,
          quality: element.asset_stack_properties.quality,
          rarity: element.asset_stack_search_properties.rarity,
          set: element.asset_stack_search_properties.set,
          price:
            Number(element.assets_floor_price.quantity_with_fees) *
            0.000000000000000001,
          name: element.name,
          image: element.image_url,
        };
        arrCardsETH.push(card);
      });
      //arrCardsETH.push(resp.data.result);
      return arrCardsETH;
    } catch (e) {
      console.log(e);
    }
  }
}
