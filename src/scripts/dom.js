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
    const items = getData();
    root.append(contentGrid(items), toastContainer());
}

const contentGrid = (items) => {
    const g = newEl('div', null, 'home-grid', ['grid']);
    g.append(dessertList(items), cartList(items));
    return g;
}

const toastContainer = () => {
    return newEl('div', null, 'toast-con', []);
}

const itemCard = (item) => {

    const card = newEl('div', null, `${item.name}`, ['item-card']);

    const con = newEl('div', null, '', []);
    const topCon = newEl('div', null, '', ['card-top']);
    const botCon = newEl('div', null, '', ['card-bot']);
    const btnCon =  newEl('div', null, 'btn-con', ['card-btns']);
    btnCon.dataset.id = item.getId();

    const fig = newEl('figure', null, '', ['img-con']);
    const img = newEl('img', null, `${item.name}-img`, ['item-img']);
    img.src = item.image[device];

    const cartCount =  newEl('span', 0, 'item-cart-count', ['cart-qty', 'no-display']);


    const addBtn = newEl('button', null, 'cart-increment',  ['btn', 'single']);
    const subBtn = newEl('button', null, 'cart-decrement', ['btn', 'no-display', 'small']);

        addBtn.addEventListener('click', () => {
            const res = cart.addItem(item);
            toast.queueToast(res.msg, res.success);
            if (res.success) {
                updateCartList();
                updateCardQty(item);
                updateBtnDisplay(item);
            }
        });
        addBtn.innerHTML= icons.increment.cart + 'Add to Cart';

        subBtn.addEventListener('click', () => {
            const res = cart.removeItem(item);
            toast.queueToast(res.msg, res.success);
            if (res.success) {
                updateCartList();
                updateCardQty(item);
                updateBtnDisplay(item);
            }
        });
        subBtn.innerHTML = icons.decrement.minus;


    const category = newEl('p', item.category);
    const name = newEl('h4', item.name);
    const price = newEl('p', `$${item.price.toFixed(2)}`);

    fig.append(img);
    btnCon.append(subBtn, cartCount, addBtn);
    topCon.append(fig, btnCon);
    botCon.append(category, name, price);
    con.append(topCon, botCon);
    card.append(con);
    return card;
}

const dessertList = (items) => {
    const con = newEl('div', null, 'dessert-con');
    const heading = newEl('h2', 'Desserts', null, []);

    const itemList = itemGrid(items);

    con.append(heading, itemList);
    return con;
}

const itemGrid = (items) => {

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
        toast.queueToast(res.msg, res.success);
        if (res.success){
            updateCartList();
            updateCardQty();
            updateBtnDisplay();
        }
    });

    const confirmBtn = newEl('button',  'Confirm Order', 'confirm-order', ['btn']);
    confirmBtn.addEventListener('click', () => {
        const res = cart.confirmOrder();
        toast.queueToast(res.msg, res.success);
        if (res.success){ const modal = orderConfirmationModal(res.order); root.append(modal); modal.showModal();  }
    });

    botCon.append(total, resetBtn, confirmBtn);
    con.append(heading, listCon, botCon);
    return con;
}

const cartItem = (item, button = false, image = false) => {
    const con = newEl('div');

    const name = newEl('h3', item.name);
    const price = newEl('p', `@ $${item.price.toFixed(2)}`);
    const qty = newEl('p', `${item.quantity}x`);
    const total = newEl('p', `$${(item.getTotal(item.quantity)).toFixed(2)}`);

    let fig = undefined;
    let img;
    if (image !== false){
        fig = newEl('figure');
        img = newEl('img', null, null, ['img', 'thumbnail']);
        img.src = item.image.thumbnail;
        fig.append(img);
    }

    let removeBtn = undefined;
    if (button !== false){
        removeBtn = newEl('button', null, 'remove-item', ['btn', 'small']);
        removeBtn.innerHTML = icons.decrement.remove;
        removeBtn.addEventListener('click',  () => {
            const res = cart.removeAll(item);
            toast.queueToast(res.msg, res.success);
            if (res.success) {
                updateCartList();
                updateCardQty(item);
                updateBtnDisplay(item);
            }
        });
    }

    con.append(name, qty, price, total);
    if (removeBtn !== undefined) { con.append(removeBtn); }
    if (fig !== undefined) { con.prepend(fig); }
    return con;
}

const updateCartList = () =>  {
    const items = cart.getCartList();

    const list = document.querySelector('#cart-list');
    list.replaceChildren();

    if (items.length > 0) {items.forEach(item => list.append(cartItem(item, true)));}
    updateCartTotal();
}

const updateCartTotal = () => {
    document.querySelector('#cart-total').textContent = `$${cart.getTotal().toFixed(2)}`;
}

const updateCardQty = (item = null) => {
    if (!item){
        document.querySelectorAll('#item-cart-count').forEach(el => el.textContent = String(0));
    } else {
        document.querySelector(`[data-id='${item.id}']`).querySelector('#item-cart-count').textContent = String(cart.getCartQty(item));
    }
}

const updateBtnDisplay = (item = null) => {

    if (!item) {
        document.querySelectorAll('.multi').forEach(btnCon => {
            const dec = btnCon.querySelector('#cart-decrement');
            const qty = btnCon.querySelector('#item-cart-count');
            const inc = btnCon.querySelector('#cart-increment');
            btnCon.classList.remove('multi');
            btnCon.classList.add('single');
            dec.classList.add('no-display');
            qty.classList.add('no-display');
            inc.innerHTML = icons.increment.cart + 'Add to Cart';
        });
    }
    const style = item.quantity <= 0 ? 'single' : 'multi';
    const btnCon = document.querySelector(`[data-id='${item.id}']`);
    const dec = btnCon.querySelector('#cart-decrement');
    const qty = btnCon.querySelector('#item-cart-count');
    const inc = btnCon.querySelector('#cart-increment');

    switch(style) {
        case 'single':
        btnCon.classList.remove('multi');
        btnCon.classList.add('single');
        dec.classList.add('no-display');
        qty.classList.add('no-display');
        inc.classList.remove('small');
        inc.classList.add('single');
        inc.innerHTML = icons.increment.cart + 'Add to Cart';
        break;

        case 'multi':
            btnCon.classList.remove('single');
            btnCon.classList.add('multi');
            dec.classList.remove('no-display');
            qty.classList.remove('no-display');
            inc.classList.add('small');
            inc.classList.remove('single');
            inc.innerHTML = icons.increment.plus;
            break;
    }

}

const orderConfirmationModal = (order) => {
    const m = newEl('dialog', null, 'order-confirmation-modal');
    const heading = newEl('h2', 'Order Confirmed');
    const text = newEl('p', 'We hope you enjoy your food!');

    const orderCon = newEl('div');
    const itemList = newEl('div');

    order.items.forEach(item => { itemList.append(cartItem(item, false, true)); });

    const newOrderBtn = newEl('button', 'Start New Order', 'new-order', ['btn']);
    newOrderBtn.addEventListener('click', () => {
        m.close();
        cart.emptyCart();
        updateCartList();
        updateCardQty();
    });

    const orderTotal = newEl('h4', `$${order.total.toFixed(2)}`);

    orderCon.append(itemList, orderTotal);
    m.append(heading, text, orderCon, newOrderBtn);
    return m;
}