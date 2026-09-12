import data from '../../product-list-data/data.json' with { type: 'json' };
import { Item } from './Item.js';


export const getData = () => {
    const formatted = [];
    data.forEach(item => {
        formatted.push(new Item(item.name, item.category, item.price, item.image));
    });
    return formatted;
}
