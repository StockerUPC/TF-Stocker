export class Product{
        constructor({id="", name="", description="", photoUrl="", purchasePrice=0.00,salePrice=0.00, stock=0, expiryDate="", categoryId=0}) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.photoUrl = photoUrl;
        this.purchasePrice = purchasePrice;
        this.salePrice = salePrice;
        this.stock = stock;
        this.expiryDate = expiryDate;
        this.categoryId = categoryId;
    }
}
