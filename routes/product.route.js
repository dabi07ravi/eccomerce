const {createProduct,getAll,getProduct,updateProduct,deleteProduct} = require('../controller/product.controller');
const router = require('./auth.route');

router.post('/create',createProduct);
router.get('/getall',getAll);
router.get('/get/:id',getProduct);
router.put('/update/:id',updateProduct);
router.delete('/delete/:id',deleteProduct);

module.exports = router;

