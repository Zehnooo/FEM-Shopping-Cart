import { newEl } from './elements.js';

const root = document.querySelector('main');

const contentGrid = () => {
    const g = newEl('div', null, 'home-grid', ['grid']);


}

const itemCard = (item) => {
    const card = newEl('div', null, `${item.name}`, ['item-card']);

    const con = newEl('div', null, '', []);
    const topCon = newEl('div', null, '', []);
    const botCon = newEl('div', null, '', []);

    const fig = newEl('figure', null, '', ['img-con']);
    const img = newEl('img', null, `${item.name}-img`, ['item-img']);

    const btn = newEl('button', 'Add to Cart', 'add-to-cart', ['add', 'btn']);

    const category = newEl('p', item.category);
    const name = newEl('h4', item.name);
    const price = newEl('p', item.price);

    topCon.append(fig, btn);
    botCon.append(category, name, price);
    con.append(topCon, botCon);
    card.append(con);
}

const itemGrid = (items) => {
    const g = newEl('div', null, 'item-grid', ['grid']);


    return g;
}

const cartList = () => {
    const con = newEl('div', null, '', []);

}