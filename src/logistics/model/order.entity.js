export class Order{
    constructor({id="", productId="", quantity=0, deliveryDate="", status=""}) {
        this.id = id;
        this.productId = productId;
        this.quantity = quantity;
        this.deliveryDate = deliveryDate;
        this.status = status;
    }
}
