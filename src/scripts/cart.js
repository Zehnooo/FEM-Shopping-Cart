export const cart= {
    items: [],
    total: 0,
    findItemInCart(item){
        return cart.items.find(i => i.name === item.name) ? cart.items.find(i => i.name === item.name) : undefined;
    },
    addItem(item){
        const exists = cart.findItemInCart(item);
        if (exists === undefined){ item.quantity++; cart.items.push(item); }
        else { exists.quantity++; }
        cart.setTotal();
        return { success: true, msg: `Added ${item.name} to cart` }
        },
    removeItem(item){
        const exists = cart.findItemInCart(item);
        if (exists === undefined){ return { success: false, msg: `${item.name} is not in your cart. Please try again.`} }
        exists.quantity--;
        cart.setTotal();
        if (exists.quantity <= 0)  {
            cart.items = cart.items.filter(it => it.name !== item.name);
            return { success: true, msg: `Removed ${item.name} from cart` }
        }
        return { success: true, msg: `Removed 1 ${item.name}` }
    },
    removeAll(item){
        console.log(cart.items);
        const exists = cart.findItemInCart(item);
        if (exists === undefined){ return { success: false, msg: `${item.name} is not in your cart. Please try again.`} }
        cart.items = cart.items.filter(it => it.name !== item.name);
        cart.setTotal();
        return { success: true, msg: `Removed ${item.name} from cart` }
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
        return { success: true, msg: 'Cart emptied...' }
    }
}
