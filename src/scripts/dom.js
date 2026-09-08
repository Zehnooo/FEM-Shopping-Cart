import { newEl } from './elements.js';
import { getData } from './loadData.js';
import { cart } from './cart.js';
import { client } from './client.js';

const root = document.querySelector('#root');


export const initDom = () => {

    root.append(contentGrid());
}

const contentGrid = () => {
    const g = newEl('div', null, 'home-grid', ['grid']);
    g.append(itemGrid(), cartList());
    return g;
}

const itemCard = (item) => {
    const card = newEl('div', null, `${item.name}`, ['item-card']);

    const con = newEl('div', null, '', []);
    const topCon = newEl('div', null, '', []);
    const botCon = newEl('div', null, '', []);

    const fig = newEl('figure', null, '', ['img-con']);
    const img = newEl('img', null, `${item.name}-img`, ['item-img']);
    img.src = item.image.device;
    const btn = newEl('button', 'Add to Cart', 'add-to-cart', ['add', 'btn']);

    const category = newEl('p', item.category);
    const name = newEl('h4', item.name);
    const price = newEl('p', item.price);

    fig.append(img);
    topCon.append(fig, btn);
    botCon.append(category, name, price);
    con.append(topCon, botCon);
    card.append(con);
    return card;
}

const itemGrid = () => {
    const items = getData();
    const g = newEl('div', null, 'item-grid', ['grid']);
    items.forEach(item => { g.append(itemCard(item))});
    return g;
}

const cartList = () => {
    const con = newEl('div', null, '', []);
    const list = cart.getCartList();
    const listCon = newEl('div', null,  '', []);
    list.forEach(it => listCon.append(cartItem(it)));
    con.append(listCon);
    return con;
}

const cartItem = (item) => {
    console.log(item);
    const con = newEl('div');

    const fig = newEl('figure');
    const img = newEl('img');
    img.src = item.image.thumbnail;
    const name = newEl('h3', item.name);
    const price = newEl('p', `$${item.price}`);

    fig.append(img);
    con.append(img, name, price)
    return con;
}