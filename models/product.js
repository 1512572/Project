var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    image: {type: String, required: true},
    name: {type: String, required: true},
    desc: {type: String, required: true},
    price: {type: Number, required: true, min: 500},
    material: {type: String, required: true},
    width: {type: Number, required: true, min: 1},
    height: {type: Number, required: true, min: 1},
    added: {type: Date, default: Date.now, required: true},
    status: {type: Boolean, required: true}
});

module.exports = mongoose.model('Product', schema);