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

  updateQuality() {
    this.items.forEach((item) => {
        //Break down into product types
      switch (item.name) {
        case "Sulfuras, Hand of Ragnaros":
          //console.info("I'm legendary, you can't change me. Maybe I will change you");
          break;
        case "Aged Brie":
          const brieIncrement = item.sellIn <= 0 ? 2 : 1;
          this.increaseQuality(item, { number: brieIncrement });
          this.decreaseSellIn(item);
          break;
        case "Backstage passes to a TAFKAL80ETC concert":
            const number = item.sellIn > 10 ? 1 : item.sellIn > 5 ? 2 : item.sellIn > 0 ? 3 : 0;
            if(number === 0) {
                this.dropQuality(item);
            } else {
                this.increaseQuality(item, { number, limits: this.limits });
            }
            this.decreaseSellIn(item);
          break;
        case "Conjured Mana Cake":
          this.decreaseQuality(item, { number: 2 });
          this.decreaseSellIn(item);
          break;
        default:
          this.decreaseQuality(item, { number: 1 });
          this.decreaseSellIn(item);
      }
    });

    return this.items;
  }
  decreaseSellIn(item) {
    item.sellIn = item.sellIn - 1;
  }
  increaseQuality(item: Item, options: { number: number }) {
    //Quality can't be above max value
    const isNotOverMax = item.quality + options.number <= this.limits.max;
    if (item.quality < this.limits.max && isNotOverMax) {
      item.quality = item.quality + options.number;
    } else {
        item.quality = this.limits.max;
    }
  }

  decreaseQuality(item: Item, options: { number: number }) {
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

  dropQuality(item: Item) {
      item.quality = this.limits.min;
  }
}
