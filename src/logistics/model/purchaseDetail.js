export class PurchaseDetail {
    constructor({ id = "", purchasePrice=0.00,salePrice=0.00, quantity=0, total=0.00,  purchaseId=0,productId=0,}) {
        this.id = id;
        this.purchasePrice = purchasePrice;
        this.salePrice = salePrice;
        this.quantity = quantity;
        this.total = total;
        this.purchaseId = purchaseId;
        this.productId = productId;
    }
}