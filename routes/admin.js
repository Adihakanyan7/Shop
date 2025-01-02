const path = require('path');

const express = require('express');

<<<<<<< HEAD
const adminController = require('../controllers/admin');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);

// /admin/products => GET
router.get('/products', adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct);

router.get('/edit-product/:productId', adminController.getEditProduct);

router.post('/edit-product', adminController.postEditProduct);

router.post('/delete-product', adminController.postDeleteProduct);
=======
const adminCotroller = require('../controllers/admin');

const router = express.Router();




// /admin/add-product =>GET
router.get("/add-product", adminCotroller.getAddProduts);

// /admin/product =>GET
router.get("/products", adminCotroller.getProducts);

// /admin/add-product => POST
router.post("/add-product",adminCotroller.postAddProduct);

// /admin/add-product => POST
router.get("/edit-product/:productId",adminCotroller.getEditProduts);

router.post("/edit-product",adminCotroller.postEditProduct);

router.post('/delete-product', adminCotroller.postDeleteProuct);





>>>>>>> 8bcc4eaade454316f1a36a13b24483ee05ef91ad

module.exports = router;
