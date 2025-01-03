const Product = require('../models/product');
<<<<<<< HEAD
const Order = require('../models/order');

exports.getProducts = (req, res, next) => {
    Product.find()
        .then((products) => {
            console.log(products);
            res.render('shop/product-list', {
                prods: products,
                pageTitle: 'All Products',
                path: '/products',
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId)
        .then((product) => {
            res.render('shop/product-detail', {
                product: product,
                pageTitle: product.title,
                path: '/products',
            });
        })
        .catch((err) => console.log(err));
};

exports.getIndex = (req, res, next) => {
    Product.find()
        .then((products) => {
            res.render('shop/index', {
                prods: products,
                pageTitle: 'Shop',
                path: '/',
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.getCart = (req, res, next) => {
    req.user
        .populate('cart.items.productId')
        /** NO execPopulate method -- removed */
        .then((user) => {
            const products = user.cart.items;
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                products: products,
            });
        })
        .catch((err) => console.log(err));
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId)
        .then((product) => {
            return req.user.addToCart(product);
        })
        .then((result) => {
            console.log(result);
            res.redirect('/cart');
        });
=======
const Cart = require('../models/cart');
const Profduct = require('../models/product');


exports.getProducts = (req, res, next) =>{
    Product.fetchAll((products) =>{
        res.render('shop/product-list', {
            prods: products,
            pageTitle : 'All Products',
            path: '/products',
        });
    });
    
};

exports.getProduct = (req, res, next ) => {
    const prodId = req.params.productId;
    //console.log(prodId);
    Product.findById(prodId, (product) => {
        //console.log('Product Title: ', product.title);
        res.render('shop/product-detail', {
            product: product,
            pageTitle: product.title,
            path: '/products'
        })
    });
    ;
};


exports.getIndex = ( req, res, next) => {
    Product.fetchAll((products) =>{
        res.render('shop/index', {
            prods: products,
            pageTitle : 'Shop',
            path: '/',
        });
    });
};

exports.getCart = (req, res ,next) => {
    Cart.getCart(cart =>{
        Product.fetchAll(products =>{
            const cartProducts = [];
            for (product of products){
                const cartProductData = cart.products.find(prod => prod.id.toString() === product.id.toString());
                if (cartProductData){
                    cartProducts.push({productData: product, qty: cartProductData.qty});
                }
            }
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                products: cartProducts
            });
        });
    });
};

exports.postCart = (req, res, next) =>{
    const prodId = req.body.productId;
    //console.log('postCart -> pordId: ',prodId);
    Product.findById(prodId, (product) =>{
        Cart.addProduct(prodId, product.price);
    });
    res.redirect('/cart')
>>>>>>> 8bcc4eaade454316f1a36a13b24483ee05ef91ad
};

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
<<<<<<< HEAD
    req.user
        .removeFromCart(prodId)
        .then(() => {
            res.redirect('/cart');
        })
        .catch((err) => console.log(err));
};

exports.postOrder = (req, res, next) => {
    req.user
        .populate('cart.items.productId')
        /** NO execPopulate method -- removed */
        .then((user) => {
            console.log(user.cart.items);
            const products = user.cart.items.map((i) => {
                return {
                    quantity: i.quantity,
                    product: { ...i.productId._doc },
                };
            });
            const order = new Order({
                user: {
                    name: req.user.name,
                    userId: req.user,
                },
                products: products,
            });
            return order.save();
        })
        .then((result) => {
            return req.user.clearCart();
        })
        .then((result) => {
            res.redirect('/orders');
        })
        .catch((err) => console.log(err));
};

exports.getOrders = (req, res, next) => {
    Order.find({ 'user.userId': req.user._id })
        .then((orders) => {
            res.render('shop/orders', {
                path: '/orders',
                pageTitle: 'Your Orders',
                orders: orders,
            });
        })
        .catch((err) => console.log(err));
};
=======
    Product.findById(prodId, product =>{
        Cart.deleteProduct(prodId, product.price);
        res.redirect('/cart');
    });
    
}

exports.getOredrs = (req, res ,next) => {
    res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders'
    });
};

exports.getCheckout = (req, res, next) =>{
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout'
    });
};

>>>>>>> 8bcc4eaade454316f1a36a13b24483ee05ef91ad
