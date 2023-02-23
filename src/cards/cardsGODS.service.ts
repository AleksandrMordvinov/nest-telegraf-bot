import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class GetCardsGODS {
  async getCardsGODS() {
    try {
      const arrCardsGODS = [];
      const resp = await axios.get(
        'https://marketplace-api.immutable.com/v1/stacked-assets/0xacb3c6a43d15b907e8433077b6d38ae40936fe2c/search?direction=desc&order_by=buy_quantity_with_fees&page_size=4500&token_address=0xccc8cb5229b0ac8069c51fd58367fd1e622afd97&token_type=ERC20',
      );
      arrCardsGODS.length = 0;
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
        arrCardsGODS.push(card);
      });

      return arrCardsGODS;
    } catch (e) {
      console.log(e);
    }
  }
}
