module.exports = function Cart(oldCart){
    this.items = oldCart.items || [];
    this.totalPrice = oldCart.totalPrice || 0;
    this.count = oldCart.count || 0;
    
    this.add = function(item, image, quty, pid){
        var storedItem;
        storedItem = this.items[this.count] = {item: item, imagePath: image, qty: 0, price: 0, key: pid};
        this.count++;
        storedItem.qty = quty;        
        storedItem.price = storedItem.item.price * storedItem.qty;
        this.totalPrice += storedItem.price;
    }

    this.generateArray = function(){
        var arr = [];
        for (var id in this.items){
            arr.push(this.items[id]);
        }
        return arr;
    };
};