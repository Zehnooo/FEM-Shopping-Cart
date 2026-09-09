import { newEl } from './elements.js';
import { getData } from './loadData.js';
import { cart } from './cart.js';
import { client } from './client.js';

const root = document.querySelector('#root');
let device;

export const initDom = () => {
    device = client.device.getDevice();
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
    img.src = item.image[device];

    const btn = newEl('button', 'Add to Cart', 'add-to-cart', ['add', 'btn']);
    btn.addEventListener('click', () => {
        cart.addItem(item);
        updateCartList();
    });

    const category = newEl('p', item.category);
    const name = newEl('h4', item.name);
    const price = newEl('p', `$${item.price.toFixed(2)}`);

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

    items.forEach(item => { g.append(itemCard(item)) });
    return g;
}

const cartList = () => {
    const con = newEl('div', null, 'cart-list-con', []);
    const listCon = newEl('div', null,  'cart-list', []);

    const resetBtn = newEl('button', 'Empty Cart', 'empty-cart', ['btn']);
    resetBtn.addEventListener('click', () => {
        cart.emptyCart();
        updateCartList();
    });

    con.append(listCon, resetBtn);
    return con;
}

const cartItem = (item) => {
    const con = newEl('div');

    const fig = newEl('figure');
    const img = newEl('img');
    img.src = item.image.thumbnail;

    const name = newEl('h3', item.name);
    const price = newEl('p', `@$${item.price.toFixed(2)}`);
    const qty = newEl('p', `${item.quantity}`);
    const total = newEl('p', `$${(item.price * item.quantity).toFixed(2)}`);

    fig.append(img);
    con.append(img, name, price, qty, total)
    return con;
}

const updateCartList = () =>  {
    const items = cart.getCartList();
    const list = document.querySelector('#cart-list');

    if (items.length === 0) { list.replaceChildren(); return; }

    list.replaceChildren();
    items.forEach(item => list.append(cartItem(item)));
}