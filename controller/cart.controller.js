const cartModel = require('../models/cart.model');

const createcart = async (req,res,next) => {
    try {
            const cart  = await cartModel.create(req.body);
            return res.status(200).send(cart);
    } catch (error) {
        return next(err);
    }
}


const getAll = async (req,res,next) => {
    try {
        const limit =
        req.query && !isNaN(parseInt(req.query.limit))
          ? parseInt(req.query.limit)
          : 10;
      const page =
        req.query && !isNaN(parseInt(req.query.page))
          ? parseInt(req.query.page)
          : 1;
      const skip = (page - 1) * limit;
            const carts = await cartModel.find().skip(skip).limit(limit);
            const count = await cartModel.countDocuments();
            const totalPage = Math.ceil(count / limit);
             return res.status(200).send({carts, totalDoc: count,
                totalPage: totalPage,});
    } catch (error) {
        return next(err);
    }
}

const getcart = async (req,res,next) => {
    try {
            const {id} = req.user;
            const cart = await cartModel.findById(id);
             return res.status(200).send(cart);
    } catch (error) {
        return next(err);
    }
}

const updatecart = async (req,res,next) => {
    try {
            const {id} = req.user;
            const updatecart = await cartModel.findByIdAndUpdate(id, req.body, {new : true});
             return res.status(200).send(updatecart);
    } catch (error) {
        return next(err);
    }
}

const deletecart = async (req,res,next) => {
    try {
            const {id} = req.user;
            const delcart = await cartModel.findByIdAndDelete(id);
             return res.status(200).send(delcart);
    } catch (error) {
        return next(err);
    }
}

module.exports = {createcart,getAll,getcart,updatecart,deletecart}
