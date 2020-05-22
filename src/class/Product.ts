export class Product {
    public image!: string;
    public price!: string;
    public currency!: string;
    public name!: string;
    
    getImage() {
        return this.image;
    }

    getPrice() {
        return this.price;
    }

    getCurrency() {
        return this.currency;
    }

    getName() {
        return this.name;
    }
}