const router = require('express').Router();
const {regUser,loginUser,forgotPassword, resetPassword} = require('../controller/auth.controller');


router.post('/register', regUser);
router.post('/login',loginUser);
router.post('/gettoken', forgotPassword);
router.post('/resetpass/:token', resetPassword);

module.exports = router;