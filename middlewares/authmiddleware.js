const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

const authMiddleware = async (req, res, next) => {
  try {
    if (req.headers.authorization.startsWith("Bearer")) {
      let token = req.headers.authorization.split(" ")[1];
      let decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
      let user = await userModel.findById(decodeToken.id);
      req.user = user;
      next();
    } else {
      throw new Error("enter the token");
    }
  } catch (error) {
    return next(error);
  }
};

const isAdminMiddleware = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      throw new Error("you are not an admin");
    }else{
        next();
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = {authMiddleware,isAdminMiddleware};
