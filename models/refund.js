const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Refund = new Schema({
    Room: {
        type: String
    },
    PaymentDate: {
        type: String
    },
    Meesage: {
        type: String
    },
    img:{
        type:String
    }
});

module.exports = mongoose.model('refund', Refund);