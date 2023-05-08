const userModel = require("../models/user.model");

const getAll = async (req, res, next) => {
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
    const users = await userModel.find().skip(skip).limit(limit);
    const count = await userModel.countDocuments();
    const totalPage = Math.ceil(count / limit);
    return res.status(200).json({
      message: "success",
      data: {
        data: users,
        totalDoc: count,
        totalPage: totalPage,
      },
    });
  } catch (error) {
    return next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await userModel.findById(id);
    return res.status(200).json({
      message: "success",
      data: user,
    });
  } catch (error) {
    return next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updateUser = await userModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json({
      message: "success",
      data: updateUser,
    });
  } catch (error) {
    return next(error);
  }
};

const delUser = async(req, res, next) => {
  try {
    const { id } = req.params;
    userModel.findByIdAndDelete(id);
    return res.status(200).json({
      message: "success",
    });
  } catch (error) {
    return next(error);
  }
};

const userBlocked = async(req,res,next) => {
  try {
      const{id} = req.params;
      await userModel.findByIdAndUpdate(id, {
        isBlocked : true
      }, {new : true})

      return res.status(200).json({
        message : "success",
      })
  } catch (error) {
      return next(error);
  }
}

const userUnBlocked = async(req,res,next) => {
  try {
    const{id} = req.params;
   await userModel.findByIdAndUpdate(id, {
      isBlocked : false
    }, {new : true})

    return res.status(200).json({
      message : "success",
    })
} catch (error) {
    return next(error);
}
}

const updatePassword  = async(req,res,next) => {
  try {
    const {id} = req.user
    const findUser = await userModel.findById(id);
    if(!findUser){
      throw new Error("User not found")
    }
    findUser.password = req.body.password;
    const updatedPassword = await findUser.save();
    return res.status(200).json({
      message : "success",
      data : updatedPassword
    })
  } catch (error) {
    return next(error);
  }
}

module.exports = { getAll, getUser, updateUser, delUser, userBlocked, userUnBlocked, updatePassword };
