/** Item in a shopping cart. */
const items = require("./fakeDb");

class Item {
  constructor(name, price) {
    this.name = name;
    this.price = price;
    items.push(this); // Add new item to the list
  }

  /** Return all items */
  static findAll() {
    return items;
  }

  /** Update item with given name */
  static update(name, newData) {
    let itemToUpdate = this.getItemByName(name);
    itemToUpdate.name = newData.name;
    itemToUpdate.price = newData.price;
    return itemToUpdate;
  }

  /** Find item by name */
  static find(name) {
    return this.getItemByName(name);
  }

  /** Remove item by name */
  static remove(name) {
    const indexToRemove = items.findIndex(item => item.name === name);
    if (indexToRemove === -1) {
      throw { message: "Not Found", status: 404 };
    }
    items.splice(indexToRemove, 1);
  }

  /** Private helper method to find item by name */
  static getItemByName(name) {
    const foundItem = items.find(item => item.name === name);
    if (!foundItem) {
      throw { message: "Not Found", status: 404 };
    }
    return foundItem;
  }
}

module.exports = Item;
