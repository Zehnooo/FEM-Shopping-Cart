import { newEl } from './elements.js';
import { getData } from './loadData.js';
import { cart } from './cart.js';
import { client } from './client.js';
import { icons } from './icons.js';
import { toast } from './toasts.js';
import { updates } from './domUpdates.js';

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
    const img = newEl('img', null, `${item.name.replaceAll(' ', '-')}-img`, ['item-img']);
    img.src = item.image[device];

    const cartCount =  newEl('span', 0, 'item-cart-count', ['cart-qty', 'no-display']);


    const addBtn = newEl('button', null, 'cart-increment',  ['btn', 'single', 'chng-qty']);
    const subBtn = newEl('button', null, 'cart-decrement', ['btn', 'no-display', 'small', 'chng-qty']);

        addBtn.addEventListener('click', () => {
            const res = cart.addItem(item);
            toast.queueToast(res.msg, res.success);
            if (res.success) {
                updates.cartUpdates();
                updates.itemUpdates(item);
            }
        });
        addBtn.innerHTML= icons.increment.cart + 'Add to Cart';

        subBtn.addEventListener('click', () => {
            const res = cart.removeItem(item);
            toast.queueToast(res.msg, res.success);
            if (res.success) {
                updates.cartUpdates();
                updates.itemUpdates(item);
            }
        });
        subBtn.innerHTML = icons.decrement.minus;


    const category = newEl('p', item.category, null, ['item-category']);
    const name = newEl('h4', item.name, null, ['item-name']);
    const price = newEl('p', `$${item.price.toFixed(2)}`, null, ['item-price']);

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
    const heading = newEl('h1', 'Desserts', null, []);

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
    const con = newEl('div', null, null, ['grid-right']);
    const cartCon = newEl('div', null, 'cart-list-con',  []);
    const listCon = newEl('div', null,  'cart-list', []);
    const botCon = newEl('div', null, 'cart-bottom', []);
    const btnCon = newEl('div', null, null, ['btn-con']);
    const totalCon = newEl('div', null, null, ['total-con']);
    const carbonCon = newEl('div', null, null, ['carbon-con', 'no-display']);

    const heading = newEl('h2', 'Your cart');
    const cartCount = newEl('span', ` (${cart.getCartQty()})`, 'cart-qty-total');

    const totalText = newEl('p', 'Order Total', null, ['no-display']);
    const total = newEl('h3', `$${cart.getTotal().toFixed(2)}`, 'cart-total',['no-display']);

    const emptyCon = newEl('div', null, null, ['cart-placeholder']);
    const emptyImg = newEl('svg', null, null,  []);
    emptyImg.innerHTML = icons.empty;
    const emptyMsg = newEl('p', 'Your added items will appear here', null, ['txt-sml']);

    const resetBtn = newEl('button', 'Empty Cart', 'empty-cart', ['btn', 'no-display', 'cart-btn', 'empty', 'txt-med']);
    resetBtn.addEventListener('click', () => {

        const res = cart.emptyCart();
        toast.queueToast(res.msg, res.success);
        if (res.success){
            updates.cartUpdates();
            updates.itemUpdates();
        }
    });

    const confirmBtn = newEl('button',  'Confirm Order', 'confirm-order', ['btn', 'no-display', 'cart-btn', 'confirm', 'txt-med']);
    confirmBtn.addEventListener('click', () => {
        const res = cart.confirmOrder();
        toast.queueToast(res.msg, res.success);
        if (res.success){
            const modal = orderConfirmationModal(res.order);
            root.append(modal);
            modal.showModal();
        }
    });

    const carbonMsg = newEl('p', null, null, ['txt-sml']);
    ['This is a', ' carbon-neutral ', 'delivery'].forEach((str, index) => {
        index === 1 ? carbonMsg.append(newEl('span', str, null, ['carbon-text'])) : carbonMsg.append(str);
    })
    const carbonImg = newEl('svg');
    carbonImg.innerHTML = icons.carbon;

    heading.append(cartCount);
    emptyCon.append(emptyImg, emptyMsg);
    totalCon.append(totalText, total);
    btnCon.append(resetBtn, confirmBtn);
    carbonCon.append(carbonImg, carbonMsg);
    botCon.append(totalCon, carbonCon, btnCon);
    cartCon.append(heading, emptyCon, listCon, botCon);
    con.append(cartCon);
    return con;
}

export const cartItem = (item, button = false, image = false, confirmation = false) => {
    const con = newEl('div', null, null, ['cart-item']);
    const itemCon = newEl('div',  null, null, []);
    const infoCon = newEl('div', null, null, ['cart-item-info']);

    const name = newEl('h2', item.name, null, ['cart-item-name', 'txt-med']);
    const price = newEl('p', `@ $${item.price.toFixed(2)}`, null, ['cart-item-price', 'txt-med']);
    const qty = newEl('p', `${item.quantity}x`, null, ['cart-item-qty', 'txt-med']);
    const total = newEl('p', `$${(item.getTotal(item.quantity)).toFixed(2)}`, null, ['cart-item-total', 'txt-med']);

    let fig = undefined;
    let img;
    if (image !== false){
        fig = newEl('figure');
        img = newEl('img', null, null, ['img', 'thumbnail', 'item-img']);
        img.src = item.image.thumbnail;
        fig.append(img);
    }

    let removeBtn = undefined;
    if (button !== false){
        removeBtn = newEl('button', null, 'remove-item', ['btn', 'small', 'remove']);
        removeBtn.innerHTML = icons.decrement.remove;
        removeBtn.addEventListener('click',  () => {
            const res = cart.removeAll(item);
            toast.queueToast(res.msg, res.success);
            if (res.success) {
                updates.cartUpdates();
                updates.itemUpdates(item);
            }
        });
    }

    if (confirmation !== false){
        const c = newEl('div')
        c.append(qty, price);
        infoCon.append(name, c);
        if (fig !== undefined) { itemCon.prepend(fig); }
        itemCon.append(infoCon);
        con.append(itemCon, total);
        itemCon.classList.add('confirmed-item');
    } else {
        infoCon.append(qty, price, total);
        itemCon.append(name, infoCon);
        con.append(itemCon);
        if (fig !== undefined) {
            con.prepend(fig);
        }
    }
    if (removeBtn !== undefined) { con.append(removeBtn); }
    return con;
}


const orderConfirmationModal = (order) => {
    const device = client.device.getDevice();
    const m = newEl('dialog', null, 'order-confirmation-modal', [`modal-${device}`]);
    const con = newEl('div');
    m.addEventListener('close', () => { setTimeout(() => { m.remove(); }, 2000); });

    const close = newEl('button', null, 'close-modal', ['btn']);
    close.innerHTML = icons.close;
    close.addEventListener('click', () => {
        m.close();
        setTimeout(() => { m.remove(); }, 2000);
    });
    const confirm = newEl('svg');
    confirm.innerHTML = icons.confirm;

    const heading = newEl('h2', 'Order Confirmed');
    const text = newEl('p', 'We hope you enjoy your food!');

    const orderCon = newEl('div', null, null, ['confirm-list']);
    const itemList = newEl('div');
    const totalCon = newEl('div', null, null, ['total-con']);

    order.items.forEach(item => { itemList.append(cartItem(item, false, true, true)); });

    const newOrderBtn = newEl('button', 'Start New Order', 'new-order', ['btn', 'confirm', 'txt-med', 'cart-btn', 'new-order']);
    newOrderBtn.addEventListener('click', () => {
        m.close();
        cart.emptyCart();
        updates.cartUpdates();
        updates.itemUpdates();
    });

    const totalText = newEl('p', 'Order Total', null, []);
    const orderTotal = newEl('h2', `$${order.total.toFixed(2)}`);

    totalCon.append(totalText, orderTotal);
    orderCon.append(itemList, totalCon);
    con.append(close, confirm, heading, text, orderCon, newOrderBtn);
    m.append(con);
    return m;
}