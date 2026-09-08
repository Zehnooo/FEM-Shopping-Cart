import { getData } from './scripts/loadData.js';
import { cart } from './scripts/cart.js';

(() => {
    console.log("init");
    const items = getData();
    console.log("1", cart.items);
    cart.addItem(items[0]);
    cart.addItem(items[1]);
    cart.addItem(items[2]);
    console.log("2", cart.items);
    cart.addItem(items[0]);
    cart.addItem(items[0]);
    console.log("3", cart.items);
    cart.removeItem(items[0]);
})();