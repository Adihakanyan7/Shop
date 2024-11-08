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

    
            // Analyze the cart => Find exsisting product
            //console.log('cart.js -> addProduct -> id: ', id);
            //console.log('cart.js -> addProduct - > cart: ', cart.products);
            //console.log('cart.js -> addProduct - > cart.products: ', cart)
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


}