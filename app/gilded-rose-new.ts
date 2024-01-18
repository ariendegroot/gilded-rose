//@ToDo add validations when creating an item
// eg: Sulfuras can only be initiated with a quality of 80
// eg: quality can not be higher than 50 or lower than 0
// eg: name can not be empty or null and must be from a predefined list
export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

import { ProductUpdater } from "./utils/product-updater";

export class GildedRose {
  items: Array<Item>;
  limits: { min: number; max: number };
  constructor(items = [] as Array<Item>) {
    this.items = items;
    this.limits = {
      min: 0,
      max: 50,
    };
  }

  updateProduct() {
    this.items.forEach((item) => {
      //@Todo Break down into product types/categorie instead of names
      switch (item.name) {
        case "Sulfuras, Hand of Ragnaros":
          //console.info("I'm legendary, you can't change me. Maybe I will change you");
          break;
        case "Aged Brie":
          //@Todo let increaseQuality handle incrementing value based on product type
          const brieIncrement = item.sellIn <= 0 ? 2 : 1;
          ProductUpdater.increaseQuality(item, {
            number: brieIncrement,
          });

          break;
        case "Backstage passes to a TAFKAL80ETC concert":
          const number =
            item.sellIn > 10
              ? 1
              : item.sellIn > 5
              ? 2
              : item.sellIn > 0
              ? 3
              : 0;
          if (number === 0) {
           ProductUpdater.dropQuality(item);
          } else {
           ProductUpdater.increaseQuality(item, { number });
          }

          break;
        case "Conjured Mana Cake":
         //@Todo let decreaseQuality handle decrementing value based on product type
         ProductUpdater.decreaseQuality(item, { number: 2});
          break;
        default:
         ProductUpdater.decreaseQuality(item, { number: 1});
      }
      if(item.name !== "Sulfuras, Hand of Ragnaros") {
        ProductUpdater.decreaseSellIn(item);
      }
  
    });

    return this.items;
  }
}
