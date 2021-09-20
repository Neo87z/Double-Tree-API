const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Manager = new Schema({
    HolderName: {
        type: String
    },
    Status: {
        type: String
    },
    RoomID: {
        type: String
    },
    img:{
        type:String
    }
});

module.exports = mongoose.model('payment', Manager);