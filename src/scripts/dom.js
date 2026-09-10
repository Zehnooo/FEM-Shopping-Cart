import { newEl } from './elements.js';
import { getData } from './loadData.js';
import { cart } from './cart.js';
import { client } from './client.js';
import { icons } from './icons.js';
import { toast } from './toasts.js';

const root = document.querySelector('#root');
let device;

export const initDom = () => {
    device = client.device.getDevice();
    root.append(contentGrid(), toastContainer());
}

const contentGrid = () => {
    const g = newEl('div', null, 'home-grid', ['grid']);
    g.append(dessertList(), cartList());
    return g;
}

const toastContainer = () => {
    return newEl('div', null, 'toast-con', ['empty']);
}

const itemCard = (item) => {

    const card = newEl('div', null, `${item.name}`, ['item-card']);

    const con = newEl('div', null, '', []);
    const topCon = newEl('div', null, '', []);
    const botCon = newEl('div', null, '', []);
    const btnCon =  newEl('div', null, 'btn-con', []);

    const fig = newEl('figure', null, '', ['img-con']);
    const img = newEl('img', null, `${item.name}-img`, ['item-img']);
    img.src = item.image[device];

    const defaultAddBtn = newEl('button', 'Add to Cart', 'add-to-cart', ['default-add', 'btn']);
    defaultAddBtn.addEventListener('click', () => {
        const res = cart.addItem(item);
        toast.queueToast(res.msg, res.success);
        if (res.success) { updateCartList(); }
    });

    const addBtn = newEl('button', null, 'cart-increment',  ['btn'  /*, 'no-display'*/]);
    const subBtn = newEl('button', null, 'cart-decrement', ['btn' /*,'no-display'*/]);

        addBtn.addEventListener('click', () => {
            const res = cart.addItem(item);
            toast.queueToast(res.msg, res.success);
            if (res.success) { updateCartList(); }
        });
        addBtn.innerHTML= icons.increment;

        subBtn.addEventListener('click', () => {
            const res = cart.removeItem(item);
            toast.queueToast(res.msg, res.success);
            if (res.success) { updateCartList(); }
        });
        subBtn.innerHTML = icons.decrement;


    const category = newEl('p', item.category);
    const name = newEl('h4', item.name);
    const price = newEl('p', `$${item.price.toFixed(2)}`);

    fig.append(img);
    btnCon.append(subBtn, defaultAddBtn, addBtn);
    topCon.append(fig, btnCon);
    botCon.append(category, name, price);
    con.append(topCon, botCon);
    card.append(con);
    return card;
}

const dessertList = () => {
    const con = newEl('div', null, 'dessert-con');
    const heading = newEl('h2', 'Desserts', null, []);

    const itemList = itemGrid();

    con.append(heading, itemList);
    return con;
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
    const botCon = newEl('div', null, 'cart-bottom', []);

    const heading = newEl('h2', 'Your cart');

    const total = newEl('h3', `$${cart.getTotal().toFixed(2)}`, 'cart-total',[]);

    const resetBtn = newEl('button', 'Empty Cart', 'empty-cart', ['btn']);
    resetBtn.addEventListener('click', () => {
        const res = cart.emptyCart();
        if (res.success){
            toast.queueToast(res.msg, res.success);
            updateCartList();
        }
    });

    const confirmBtn = newEl('button',  'Confirm Order', 'confirm-order', ['btn']);
    confirmBtn.addEventListener('click', () => console.log('order confirmed'));

    botCon.append(total, resetBtn, confirmBtn);
    con.append(heading, listCon, botCon);
    return con;
}

const cartItem = (item) => {
    const con = newEl('div');

    const name = newEl('h3', item.name);
    const price = newEl('p', `@ $${item.price.toFixed(2)}`);
    const qty = newEl('p', `${item.quantity}x`);
    const total = newEl('p', `$${(item.getTotal(item.quantity)).toFixed(2)}`);

    const removeBtn = newEl('button', null, 'remove-item', ['btn']);
    removeBtn.addEventListener('click',  () => {
        const res = cart.removeAll(item);
        toast.queueToast(res.msg, res.success);
        if (res.success) { updateCartList(); }
    });

    con.append(name, qty, price, total, removeBtn);
    return con;
}

const updateCartList = () =>  {
    const items = cart.getCartList();

    const list = document.querySelector('#cart-list');
    list.replaceChildren();

    if (items.length > 0) {items.forEach(item => list.append(cartItem(item)));}
    updateCartTotal();
}

const updateCartTotal = () => {
    document.querySelector('#cart-total').textContent = `$${cart.getTotal().toFixed(2)}`;
}

