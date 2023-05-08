const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
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
    ],
    amount : {
        type : Number,
        require : true
    },
    address : {
        type : Object,
        require : true
    },
    status : {
        type : String,
        default : "pending"
    }
},{timstamps : true});

const orderModel = mongoose.model('Order',orderSchema);

module.exports = orderModel;
