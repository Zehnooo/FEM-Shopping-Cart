export const cart= {
    items: [],
    total: 0,

    addItem(item){
        const exists = this.items.find(it => it.name === item.name);
        exists === undefined ? this.items.push({name: item.name, price: item.price, quantity: 1,}) : exists.quantity++;
        console.log("added: ", { name: item.name, price: item.price });
        this.total = this.setTotal();
        },
    removeItem(item){
        const exists = this.items.find(it => it.name === item.name);
        exists === undefined ? console.error('ERROR: Item not found in cart.') : exists.quantity--;
        console.log("removed: ", { name: item.name, price: item.price });
        this.total = this.setTotal();
    },
    setTotal(){
        return this.total = this.items.reduce((acc, item) => { return acc + (item.price * item.quantity)}, 0);
    },
    getTotal(){
        return this.total.toFixed(2);
    },
    getCartList(){
        return this.items;
    }
}
