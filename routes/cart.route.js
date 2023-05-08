const {createcart,getAll,getcart,updatecart,deletecart} = require('../controller/cart.controller');
const router = require('express').Router();

router.post('/create',createcart);
router.get('/getall',getAll);
router.get('/get/:id',getcart);
router.put('/update/:id',updatecart);
router.delete('/delete/:id',deletecart);

module.exports = router;

