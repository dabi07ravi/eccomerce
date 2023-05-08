const router = require('express').Router();
const {getAll,getUser, updateUser, delUser, userBlocked, userUnBlocked, updatePassword} = require('../controller/user.controller');
const {authMiddleware,isAdminMiddleware} = require('../middlewares/authmiddleware');

router.get('/getall',authMiddleware, getAll);
router.get('/get/:id',authMiddleware,getUser);
router.put('/update/:id',authMiddleware,isAdminMiddleware,updateUser);
router.delete('/delete/:id',authMiddleware,isAdminMiddleware,delUser);
router.put('/blocked/:id',authMiddleware,isAdminMiddleware,userBlocked);
router.put('/unblocked/:id',authMiddleware,isAdminMiddleware,userUnBlocked);
router.post('/password', authMiddleware, updatePassword);


module.exports = router