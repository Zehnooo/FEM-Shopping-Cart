export class Item {
    constructor(name, category, price, image){
        this.name = name;
        this.category = category;
        this.price = price;
        this.image = image;
        this.quantity = 0;
    }
    getTotal(qty){
        return (this.price * qty);
    }
}