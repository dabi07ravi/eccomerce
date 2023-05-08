const express  = require("express");
const dotenv = require('dotenv').config();
const dbConnection = require('./configs/db.config');
const authRouter = require('./routes/auth.route');
const userRouter = require('./routes/user.route');
const productRouter = require('./routes/product.route');
const cartRouter = require('./routes/cart.route');
const orderRouter = require('./routes/order.route');
const {notFound,errorHandler} = require('./middlewares/errors.handler');
const app = express();


//database
dbConnection();


app.use(express.json());


// routes
app.use('/auth',authRouter);
app.use('/user', userRouter);
app.use('/product',productRouter);
app.use('/cart',cartRouter);
app.use('/order',orderRouter);

//middlewares
app.use(notFound);
app.use(errorHandler);

//server
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server is listenning on the port ${port}`);
})

