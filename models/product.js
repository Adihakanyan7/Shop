const fs = require('fs');
const path = require('path');

const Cart = require('./cart')
const p = path.join(path.dirname(require.main.filename),
'data',
'products.json'
);

const getProductsFromFile = (cb) =>{  
   fs.readFile(p, (err, fileContent) => { 
       if (err) {
            cb([]);
       }
       else{
            cb(JSON.parse(fileContent))
       }
       
   })
}


module.exports = class Profduct {
    constructor(id, title, imageUrl, price, description){
        this.id = id
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        getProductsFromFile((products) =>{
            if (this.id){
                const existingProductIndex = products.findIndex(prod => prod.id === this.id);
                const updatedProducts = [...products];
                console.log('Before !! updatedProducts[existingProductIndex]', updatedProducts[existingProductIndex]);
                updatedProducts[existingProductIndex] = this;
                console.log('Afther !!updatedProducts[existingProductIndex]', updatedProducts[existingProductIndex]);
                fs.writeFile(p, JSON.stringify(updatedProducts), (err)=>{
                    console.log(err);
                });
            } else {
                this.id = Math.random().toString();
                products.push(this);
                fs.writeFile(p, JSON.stringify(products), (err)=>{
                    console.log(err);
                });
            }
        })
    }

    static deleteById(id) {
        getProductsFromFile(products => {
            console.log("deleteById -> id: ", id);
            const product = products.find(prod => prod.id === id);
            const updatedProducts = products.filter(p => p.id.toString() !== id.toString());
            fs.writeFile(p, JSON.stringify(updatedProducts), err =>{
                if(!err){
                    Cart.deleteProduct(id, product.price);
                }
            })
        });
    }

    static fetchAll(cb) {
        getProductsFromFile(cb);
    }

    static findById(id, cb) {
        getProductsFromFile(products => {
            //console.log('Products from file:', products);
            const product = products.find(p => p.id.toString() === id.toString());
            cb(product);
        });
    }
    
    
}