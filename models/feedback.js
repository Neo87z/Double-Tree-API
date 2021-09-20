const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Feedback = new Schema({
    Name: {
        type: String
    },
    Email: {
        type: String
    },
    Subject: {
        type: String
    },
    Message: {
        type: String
    },
    img :{
        type:String
    }
});

module.exports = mongoose.model('feedback', Feedback);