const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Activities = new Schema({
    ActivityName: {
        type: String
    },
    Location: {
        type: String
    },
    Price: {
        type: String
    },
    Max: {
        type: String
    },
    img :{
        type:String
    }
});

module.exports = mongoose.model('Actviity', Activities);