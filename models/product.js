<<<<<<< HEAD
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

module.exports = mongoose.model('Product', productSchema);
// const mongodb = require('mongodb');
// const getDb = require('../util/database').getDb;

// class Product {
//     constructor(title, price, description, imageUrl, id, userId) {
//         this.title = title;
//         this.price = price;
//         this.description = description;
//         this.imageUrl = imageUrl;
//         this._id = id ? new mongodb.ObjectId(id) : null;
//         this.userId = userId;
//     }

//     save() {
//         const db = getDb();
//         let dbOp;
//         if (this._id) {
//             dbOp = db
//                 .collection('products')
//                 .updateOne({ _id: this._id }, { $set: this });
//         } else {
//             dbOp = db.collection('products').insertOne(this);
//         }
//         return dbOp
//             .then((result) => {
//                 console.log(result);
//             })
//             .catch((err) => {
//                 console.log(err);
//             });
//     }

//     static findById(prodId) {
//         const db = getDb();
//         return db
//             .collection('products')
//             .find({ _id: new mongodb.ObjectId(prodId) })
//             .next()
//             .then((product) => {
//                 console.log(product);
//                 return product;
//             })
//             .catch((err) => {
//                 console.log(err);
//             });
//     }

//     static fetchAll() {
//         const db = getDb();
//         return db
//             .collection('products')
//             .find()
//             .toArray()
//             .then((products) => {
//                 console.log(products);
//                 return products;
//             })
//             .catch((err) => {
//                 console.log(err);
//             });
//     }

//     static deleteById(prodId) {
//         const db = getDb();
//         return db
//             .collection('products')
//             .deleteOne({ _id: new mongodb.ObjectId(prodId) })
//             .then((result) => {
//                 console.log('Deleted');
//             })
//             .catch((err) => {
//                 console.log(err);
//             });
//     }
// }

// module.exports = Product;
=======
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
>>>>>>> 8bcc4eaade454316f1a36a13b24483ee05ef91ad
