export const cart= {
    items: [],
    total: 0,

    addItem(item){
        const exists = cart.items.find(it => it.name === item.name);
        if (exists === undefined){
            item.quantity = 1;
            cart.items.push(item);
        } else { exists.quantity++; }
        cart.setTotal();
        },
    removeItem(item){
        const exists = cart.items.find(it => it.name === item.name);
        exists === undefined ? console.error('ERROR: Item not found in cart.') : exists.quantity--;
        cart.setTotal();
    },
    setTotal(){
        if (!cart.items.length) { cart.total = 0; }
        cart.total = (cart.items.reduce((acc, item) => { return acc + (item.price * item.quantity)}, 0));
    },
    getTotal(){
        return cart.total;
    },
    getCartList(){
        return cart.items;
    },
    emptyCart(){
        cart.items = [];
        cart.setTotal();
    }
}
