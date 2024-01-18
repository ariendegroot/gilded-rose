import { ProductUpdater } from './product-updater'; // Replace 'your-module' with the actual module name
import { Item } from '../gilded-rose-new';

describe('ProductUpdater', () => {
  describe('increaseQuality', () => {
    it('should increase the quality of an item by the specified number', () => {
      // Arrange
      const item: Item = { quality: 5, name: "Item", sellIn: 5 };
      const options = { number: 3, limits: { max: 10, min: 0 } };
      const expectedQuality = item.quality + options.number;

      // Act
     ProductUpdater.increaseQuality(item, options);

      // Assert
      expect(item.quality).toBe(expectedQuality);
    });

    it('should not increase the quality beyond the maximum limit', () => {
      // Arrange
      const item: Item = { quality: 8, name: "Item", sellIn: 5 };
      const options = { number: 3, limits: { max: 10, min: 0 } };
      const expectedQuality = options.limits.max;

      // Act
     ProductUpdater.increaseQuality(item, options);

      // Assert
      expect(item.quality).toBe(expectedQuality);
    });

    it('should not increase the quality when the current quality is already at the maximum limit', () => {
      // Arrange
      const item: Item = { quality: 10, name: "Item", sellIn: 5  };
      const options = { number: 3, limits: { max: 10, min: 0 } };
      const expectedQuality = options.limits.max;

      // Act
     ProductUpdater.increaseQuality(item, options);

      // Assert
      expect(item.quality).toBe(expectedQuality);
    });
  });
  describe('decreaseQuality', () => {
    it('should decrease the quality of an item by the specified number when sellIn date has not passed', () => {
      // Arrange
      const item: Item = { quality: 8, sellIn: 5 };
      const options = { number: 2, limits: { min: 0 } };
      const expectedQuality = item.quality - options.number;

      // Act
     ProductUpdater.decreaseQuality(item, options);

      // Assert
      expect(item.quality).toBe(expectedQuality);
    });

    it('should multiply the decrease amount and decrease the quality when sellIn date has passed', () => {
      // Arrange
      const item: Item = { quality: 8, sellIn: -1, name: "Item" };
      const options = { number: 2, limits: { min: 0, max: 10 } };
      const expectedQuality = item.quality - (options.number * 2);

      // Act
     ProductUpdater.decreaseQuality(item, options);

      // Assert
      expect(item.quality).toBe(expectedQuality);
    });

    it('should not decrease the quality below the minimum limit', () => {
      // Arrange
      const item: Item = { quality: 1, sellIn: 5, name: "Item" };
      const options = { number: 2, limits: { min: 0, max: 10 } };
      const expectedQuality = options.limits.min;

      // Act
     ProductUpdater.decreaseQuality(item, options);

      // Assert
      expect(item.quality).toBe(expectedQuality);
    });

    it('should drop the quality when the decrease amount is bigger than the current quality', () => {
      // Arrange
      const item: Item = { quality: 3, sellIn: 5, name: "item" };
      const options = { number: 5, limits: { min: 0, max: 10 } };
      const expectedQuality = options.limits.min;

      // Act
     ProductUpdater.decreaseQuality(item, options);

      // Assert
      expect(item.quality).toBe(expectedQuality);
    });
  });

    describe('dropQuality', () => {
        it('should set the quality of an item to the minimum limit', () => {
          // Arrange
          const item: Item = { quality: 8, name: "Item", sellIn: 5  };     
          const options = { number: 3, limits: { max: 10, min: 0 } };
          const expectedQuality = options.limits.min;
    
          // Act
         ProductUpdater.dropQuality(item, options);
    
          // Assert
          expect(item.quality).toBe(expectedQuality);
        });
      });

      describe('decreaseSellIn', () => {
        it('should decrease the sellIn value of an item by 1', () => {
          // Arrange
          const item: Item = { sellIn: 5, name: "Item", quality: 5  };
    
          // Act
         ProductUpdater.decreaseSellIn(item);
    
          // Assert
          expect(item.sellIn).toBe(4);
        });
      });
 
});