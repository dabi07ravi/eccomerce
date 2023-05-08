const orderModel = require('../models/order.model');

const createorder = async (req,res,next) => {
    try {
            const order  = await orderModel.create(req.body);
            return res.status(200).send(order);
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
            const orders = await orderModel.find().skip(skip).limit(limit);
            const count = await orderModel.countDocuments();
            const totalPage = Math.ceil(count / limit);
             return res.status(200).send({orders, totalDoc: count,
                totalPage: totalPage,});
    } catch (error) {
        return next(err);
    }
}

const getorder = async (req,res,next) => {
    try {
            const {id} = req.user;
            const order = await orderModel.findById(id);
             return res.status(200).send(order);
    } catch (error) {
        return next(err);
    }
}

const updateorder = async (req,res,next) => {
    try {
            const {id} = req.user;
            const updateorder = await orderModel.findByIdAndUpdate(id, req.body, {new : true});
             return res.status(200).send(updateorder);
    } catch (error) {
        return next(err);
    }
}

const deleteorder = async (req,res,next) => {
    try {
            const {id} = req.user;
            const delorder = await orderModel.findByIdAndDelete(id);
             return res.status(200).send(delorder);
    } catch (error) {
        return next(err);
    }
}

module.exports = {createorder,getAll,getorder,updateorder,deleteorder}
