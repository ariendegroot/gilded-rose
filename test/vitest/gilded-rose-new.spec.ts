import { Item, GildedRose } from "@/gilded-rose-new";

describe("Gilded Rose", () => {
  it("should foo", () => {
    const gildedRose = new GildedRose([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("foo");
  });
});

describe("Aged Brie", () => {
  it("should increase in quality", () => {
    const gildedRose = new GildedRose([new Item("Aged Brie", 10, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(21);
  });

  it("should increease twice as fast when sellIn is zero or less", () => {
    const gildedRose = new GildedRose([new Item("Aged Brie", 0, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(22);
  })

  it("quality should not be more than 50", () => {
    const gildedRose = new GildedRose([new Item("Aged Brie", 10, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
  });
  it("should decrease sellIn", () => {
    const gildedRose = new GildedRose([new Item("Aged Brie", 10, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(9);
  });
});

describe("Backstage passes", () => {
  it("should increase in quality by 2 when days are 10 or less", () => {
    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(22);
  });

  it("should increase in quality by 3 when days are 5 days or less", () => {
    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 4, 20),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(23);
  });

  it("should drop quality when sellIn date is zero or less", () => {
    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });
});

describe("Sulfuras stays constant 80", () => {
  it("should increase in quality by 2 when days are 10 or less", () => {
    const gildedRose = new GildedRose([
      new Item("Sulfuras, Hand of Ragnaros", 10, 80),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(80);
  });
});

describe("Conjured items", () => {
  it("should decrease sellIn", () => {
    const gildedRose = new GildedRose([new Item("Conjured Mana Cake", 9, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(8);
  });
  it("should decrease quality", () => {
    const gildedRose = new GildedRose([new Item("Conjured Mana Cake", 9, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(18);
  });

  it("should decrease twice as fast after sellIn date", () => {
    const gildedRose = new GildedRose([new Item("Conjured Mana Cake", 0, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(16);
    const items2 = gildedRose.updateQuality();
    expect(items2[0].quality).toBe(12);
  });
});

describe("Regular items", () => {
  it("should decrease sellIn", () => {
    const gildedRose = new GildedRose([new Item("Regular Banana Peel", 9, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(8);
  });
  it("should decrease quality", () => {
    const gildedRose = new GildedRose([new Item("Regular Banana Peel", 9, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(19);
  });

  it("should decrease twice as fast after sellIn date", () => {
    const gildedRose = new GildedRose([new Item("Regular Banana Peel", 0, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(18);
    const items2 = gildedRose.updateQuality();
    expect(items2[0].quality).toBe(16);
  });
});
