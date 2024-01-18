//@ToDo add validations when creating an item
// eg: Sulfuras can only be initiated with a quality of 80
// eg: quality can not be higher than 50 or lower than 0
// eg: name can not be empty or null and must be from a predefined list

type Options = {
    number: number
}

import {Item} from '../gilded-rose-new';

  export class ProductUpdater {
    constructor() {
    }

    static limits = {
      min: 0,
      max: 50,
    };
  
    static decreaseSellIn(item) {
      item.sellIn = item.sellIn - 1;
    }
    static increaseQuality(item: Item, options: Options ) {
      //Quality can't be above max value
      const isNotOverMax = item.quality + options.number <= this.limits.max;
      if (item.quality < this.limits.max && isNotOverMax) {
        item.quality = item.quality + options.number;
      } else {
          item.quality = this.limits.max;
      }
    }
  
    static decreaseQuality(item: Item, options: Options) {
      //Multiply decrease amount when sellIn date has passed
      const shouldMultiply = item.sellIn <= 0;
      const decreaseAmount = shouldMultiply ? options.number * 2 : options.number;
      
      //Check if decrease is bigger than quality, then drop quality
      const noNegativeQuality = decreaseAmount < item.quality;
  
      if (item.quality > this.limits.min && noNegativeQuality) {
        item.quality = item.quality - decreaseAmount;
      } else {
        this.dropQuality(item);
      }
    }
  
    static dropQuality(item: Item) {
        item.quality = this.limits.min;
    }
  }
  