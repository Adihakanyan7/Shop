const fs = require('fs');
const path = require('path');
const Product = require('./product');

const p = path.join(
    path.dirname(require.main.filename),
    'data',
    'cart.json'
);
    

module.exports = class Cart{
    static addProduct(id, productPrice){
        // Fetch the previous cart 
        fs.readFile(p, (err, fileContent) =>{
            let cart = { products: [], totlaPrice: 0 };
            if (!err) {
                cart = JSON.parse(fileContent);
            }
            const exsistingProductIndex = cart.products.findIndex(prod =>  prod.id === id );
            const exsistingProduct = cart.products[exsistingProductIndex];
            let updatedProduct;
            if (exsistingProduct){
                updatedProduct = {...exsistingProduct};
                updatedProduct.qty = updatedProduct.qty + 1; 
                cart.products = [ ...cart.products ];
                cart.products[exsistingProductIndex] = updatedProduct;
            } else{ 
                updatedProduct = {id : id, qty: 1};
                cart.products = [...cart.products, updatedProduct];
            }
            cart.totlaPrice = cart.totlaPrice + +productPrice;      
            fs.writeFile(p, JSON.stringify(cart), (err)=>{
                console.log(err);
            });
        });
    }

    static deleteProduct(id, productPrice) {
        fs.readFile(p, (err, fileContent) =>{
            if (err) {
                return;
            }
            const updatedCart = { ...JSON.parse(fileContent) };
            const product = updatedCart.products.find(prod => prod.id.toString() === id.toString());
            if (!product){
                return;
            }
            const productQty = product.qty;
            updatedCart.products = updatedCart.products.filter(prod => prod.id.toString() !== id.toString());
            updatedCart.totlaPrice = updatedCart.totlaPrice - productPrice * productQty;

            fs.writeFile(p, JSON.stringify(updatedCart), (err)=>{
                console.log(err);
            });
        });
    };

    static getCart(cb){
        fs.readFile(p, (err, fileContent) =>{
            const cart = JSON.parse(fileContent);
            if (err){
                cb(null);
            } else{
                cb(cart);
            }
        });
    }


}