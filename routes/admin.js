const path = require('path');

const express = require('express');

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





module.exports = router;
