export class Sale {
    constructor({ id = "", totalAmount = 0.00,clientId = 0}) {
        this.id = id;
        this.totalAmount = totalAmount;
        this.clientId = clientId;
    }
}