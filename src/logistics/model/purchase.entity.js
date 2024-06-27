export class Purchase {
    constructor({ id = "", totalAmount = 0.00,supplierId = 0}) {
        this.id = id;
        this.totalAmount = totalAmount;
        this.supplierId = supplierId;
    }
}