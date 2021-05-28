const express = require('express');

const router = express.Router();


const path = require('path');
const controller = require('../controller/productController');

const upload = require('../middlewares/multerMiddleware');
const validations = require('../middlewares/validateCreateProducts');


router.get('/create', controller.create);

router.get('/cart', controller.cart);

router.get('/:id/edit', controller.edit);

router.get('/:id', controller.show);

router.get('/search', controller.search);

router.put('/:id', upload.single('image'), controller.update);

router.post('/store', upload.single('image'), validations, controller.store);

router.delete('/:id', controller.destroy);

module.exports = router;