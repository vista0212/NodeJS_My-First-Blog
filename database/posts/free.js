const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FreeSchema = new Schema({
    id : {type: String, required: true},
    title : {type: String, required: true},
    contents : String,
    date : {type: Date, default: Date.now},
    count : {type: Number, default: 0},
    like : {type: Number, default: 0},
    comments : [{
        name : {type: String, required: true},
        date: {type: Date, default: Date.now },
        comment: {type: String, required: true}
    }]
});

module.exports = mongoose.model('Free', FreeSchema);