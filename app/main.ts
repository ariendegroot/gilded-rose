import { Item, GildedRose } from "./gilded-rose-new.js";
let fs = require('fs'); 

const config = {
  days: 30
}

const gildedRose = new GildedRose([
    new Item("Sulfuras, Hand of Ragnaros", 10, 80),
    new Item("Aged Brie", 2, 0),
    new Item("Backstage passes to a TAFKAL80ETC concert", 10, 10),
    new Item("Conjured Mana Cake", 3, 6),
    new Item("Regular Banana Peel", 4, 20),
    new Item("Diet Coke", 4, 20),
  ]); 

const dataSet = {};

for(let i = 0; i < config.days; i++) {
  console.log(i, gildedRose.items);
  gildedRose.updateQuality();

  let copy = JSON.parse(JSON.stringify(gildedRose.items));
  dataSet[i] = copy;
}


fs.writeFile ("data.json", JSON.stringify(dataSet), (err) =>  {
  if (err) throw err;
  console.log('complete');
  }
);