export class Item {
    constructor(name, category, price, image){
        this.name = name;
        this.category = category;
        this.price = price;
        this.image = image;
    }
    getTotal(qty){
        return (this.price * qty);
    }
}