import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  it('should foo', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('foo');
  });
});

describe('Aged Brie', () => {
  it('should increase in quality', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 10, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(21);
  });

  it('should decreace sellIn', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 10, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(9);
  });
})

describe('Backstage passes', () => {
  it('should increase in quality by 2 when days are 10 or less', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(22);
  });

  it('should increase in quality by 3 when days are 5 days or less', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 4, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(23);
  });
})

describe('Sulfuras stays at 80 and no sellIn decrease', () => {
  it('should stay at 80 quality and sellIn 10', () => {
    const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 10, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(80);
    expect(items[0].sellIn).toBe(10);
  });
})

describe('Regular items', () => {
  it('should decreace sellIn', () => {
    const gildedRose = new GildedRose([new Item('Regular Banana Peel', 9, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(8);
  });
  it('should decrease quality', () => {
    const gildedRose = new GildedRose([new Item('Regular Banana Peel', 9, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(19);
  });

  it('should decrease twice as fast after sellIn date', () => {
    const gildedRose = new GildedRose([new Item('Regular Banana Peel', 0, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(18);
  })

  describe ('Quality over 50', () => {
    it('should not increase', () => {
      const gildedRose = new GildedRose([new Item('Aged Brie', 0, 50)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(50);
    })
  })
})