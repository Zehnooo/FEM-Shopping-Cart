export const cart= {
    items: [],
    total: null,

    addItem(item){
        const exists = this.items.find(it => it.name === item.name);
        exists === undefined ? this.items.push({name: item.name, price: item.price, quantity: 1,}) : exists.quantity++;
        },
    removeItem(item){
        const exists = this.items.find(it => it.name === item.name);
        exists === undefined ? console.error('ERROR: Item not found in cart.') : exists.quantity--;
    },
}
