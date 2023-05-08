const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId(),
        require : true
    },

    products : [
        {
            productId : {
                type : mongoose.Schema.Types.ObjectId(),
                require : true
            },

            quantity : {
                type : Number,
                default : 1
            }
        }
    ]
},{timstamps : true});

const cartModel = mongoose.model('Cart',cartSchema);

module.exports = cartModel;
