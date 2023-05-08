

const notFound = (req,res,next) => {
    throw new Error(`NOT FOUND : ${req.originalUrl}`);
    next();
}
const errorHandler = (err,req,res,next) => {
    if(err.message === "User already exists" || "User not exists" || "Enter wrong password" || "enter the token" || "User not found with this email"){
        return res.status(422).send(err.message);
    }
    return res.status(404 ).send(err.message);
}

module.exports = {notFound,errorHandler};