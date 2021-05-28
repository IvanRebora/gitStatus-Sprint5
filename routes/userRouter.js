const express = require('express');
const router = express.Router();
const controller = require('../controller/userController');
const path = require('path');
const authMiddleware = require('../middlewares/authMiddleware');
const validations = require('../middlewares/validateRegisterMiddleware');
const upload = require('../middlewares/multerMiddlewareUser');
const validationLogin = require('../middlewares/validateLogin');
const guestMiddleware = require('../middlewares/guestMiddleware');



router.get('/register', guestMiddleware, controller.register);

router.post('/store',  upload.single('fileavatar'),  controller.processRegister);

router.get('/login', guestMiddleware, controller.login);

router.post('/find', validationLogin, controller.loginProcess);

router.get('/profile', authMiddleware, controller.profile);

router.get('/logout', controller.logout);




module.exports = router;