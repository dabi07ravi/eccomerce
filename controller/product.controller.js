const productModel = require('../models/product.model');

const createProduct = async (req,res,next) => {
    try {
            const product  = await productModel.create(req.body);
            return res.status(200).send(product);
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
            const products = await productModel.find().skip(skip).limit(limit);
            const count = await productModel.countDocuments();
            const totalPage = Math.ceil(count / limit);
             return res.status(200).send({products, totalDoc: count,
                totalPage: totalPage,});
    } catch (error) {
        return next(err);
    }
}

const getProduct = async (req,res,next) => {
    try {
            const {id} = req.user;
            const product = await productModel.findById(id);
             return res.status(200).send(product);
    } catch (error) {
        return next(err);
    }
}

const updateProduct = async (req,res,next) => {
    try {
            const {id} = req.user;
            const updateProduct = await productModel.findByIdAndUpdate(id, req.body, {new : true});
             return res.status(200).send(updateProduct);
    } catch (error) {
        return next(err);
    }
}

const deleteProduct = async (req,res,next) => {
    try {
            const {id} = req.user;
            const delProduct = await productModel.findByIdAndDelete(id);
             return res.status(200).send(delProduct);
    } catch (error) {
        return next(err);
    }
}

module.exports = {createProduct,getAll,getProduct,updateProduct,deleteProduct}
