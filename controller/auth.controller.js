const userModel = require("../models/user.model");
const generateToken = require('../configs/jwt.config');
const sendMail = require('../controller/email.controller');

const regUser = async (req, res, next) => {
  const email = req.body.email;
  try {
    const findUser = await userModel.findOne({ email });
    if (!findUser) {
      const result = await userModel.create(req.body);
      return res.status(200).json({
        message: "user created succesfully",
        user: result,
      });
    } else {
      throw new Error("User already exists");
    }
  } catch (error) {
    return next(error);
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const findUser = await userModel.findOne({ email });
    if (!findUser) {
      throw new Error("User not exists");
    }
    const isMatch = await findUser.isPasswordMatch(password);
    if(!isMatch){
        throw new Error("Enter wrong password")
    }
    return res.status(200).json({
      message: "success",
      user: {
        firstname: findUser?.firstname,
        lastname: findUser?.lastname,
        email: findUser?.email,
        phone: findUser?.phone,
        password: findUser?.password,
        token : generateToken(findUser?._id)
      },
    });
  } catch (error) {
    return next(error);
  }
};

const forgotPassword  = async(req,res,next) => {
    const {email} = req.body;
    try {
      const findUser = await userModel.findOne({email});
      if(!findUser){
        throw new Error("User not found with this email")
      }
      const token = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
      findUser.passwordResetToken = token;
      await findUser.save();
      let data = {
        to : email,
        subject : "Forgot Password Link",
        text : "Hey User!!!",
        url : `Please follow this link to reset your password <a href="http://loclhost:3000/auth/resetpass/${token}">click here</a>`
      }
      sendMail(data);
      return res.status(200).json({
        message : "success",
        token : token
      })
    } catch (error) {
        return next(error);
    }
  
}

const resetPassword = async(req,res,next) => {
  const {token} = req.params;
  const {password} = req.body;
  try {
    const findUser = await userModel.findOne({passwordResetToken : token});
    findUser.password = password;
    findUser.passwordResetToken = undefined;
    await findUser.save();
    return res.status(200).json({
      message : "password reset successfully"
    })
  } catch (error) {
      return next(error)
  }

}

module.exports = {regUser,loginUser,forgotPassword, resetPassword};
