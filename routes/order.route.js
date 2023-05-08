const {createorder,getAll,getorder,updateorder,deleteorder} = require('../controller/order.controller');
const router = require('express').Router();

router.post('/create',createorder);
router.get('/getall',getAll);
router.get('/get/:id',getorder);
router.put('/update/:id',updateorder);
router.delete('/delete/:id',deleteorder);

module.exports = router;

