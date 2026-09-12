import { cart } from "./cart.js";
import { cartItem } from './dom.js';
import {icons} from "./icons.js";


export const updates = {
    cartUpdates(){ updateCartList(); updateCartTotal(); updateCartQty(); updateCartPlaceholder(); updateCartActions(); },
    itemUpdates(item = null){ updateCardQty(item); updateBtnDisplay(item); updateActiveStatus(item); }
}

const updateCartList = () =>  {
    const items = cart.getCartList();

    const list = document.querySelector('#cart-list');
    list.replaceChildren();

    if (items.length > 0) {items.forEach(item => list.append(cartItem(item, true, false)));}
}

const updateCartTotal = () => {
    document.querySelector('#cart-total').textContent = `$${cart.getTotal().toFixed(2)}`;
}

const updateCartQty = () => { document.querySelector('#cart-qty-total').textContent = ` (${cart.getCartQty()})`}

const updateCardQty = (item = null) => {
    if (!item){
        document.querySelectorAll('#item-cart-count').forEach(el => el.textContent = String(0));
    } else {
        document.querySelector(`[data-id='${item.id}']`).querySelector('#item-cart-count').textContent = String(cart.getItemQty(item));
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
            inc.classList.remove('small');
            inc.classList.add('single');
        });
        return;
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

const updateActiveStatus = (item = null) => {
    if (item  !== null){
        const activeQty = cart.getItemQty(item);
        const selector = item.name.replaceAll(' ', '-') + '-img'
        const img = document.querySelector(`#${selector}`);
        activeQty <= 0 ? img.classList.remove('active') : img.classList.add('active');
        return;
    }
    document.querySelectorAll('.item-img').forEach(img => img.classList.remove('active'));
}

const updateCartPlaceholder = () => {
    const p = document.querySelector('.cart-placeholder');
    !cart.getCartList().length ? p.classList.remove('no-display') : p.classList.add('no-display');
}

const updateCartActions = () => {
    const x = document.querySelector('#cart-bottom');
    const y = x.querySelectorAll('*');
    !cart.getCartList().length ? y.forEach(el => el.classList.add('no-display')) : y.forEach(el => el.classList.remove('no-display'));
}