const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

<<<<<<< HEAD
router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProduct);

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

router.post('/cart-delete-item', shopController.postCartDeleteProduct);

router.post('/create-order', shopController.postOrder);

router.get('/orders', shopController.getOrders);

module.exports = router;
=======
router.get("/",shopController.getIndex);

router.get("/products", shopController.getProducts);

router.get("/products/:productId", shopController.getProduct);

router.get("/cart", shopController.getCart);

router.post("/cart", shopController.postCart);

router.post('/cart-delete-item', shopController.postCartDeleteProduct);

router.get("/orders", shopController.getOredrs);


router.get("/checkout", shopController.getCheckout);




module.exports = router;
>>>>>>> 8bcc4eaade454316f1a36a13b24483ee05ef91ad
