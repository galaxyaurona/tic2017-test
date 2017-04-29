var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ImageFragmentSchema = new Schema({
    imageID: {type: String, required: [true,'imageID is required'] },
    packet: {type: Number, required: [true,'packetis required'] },
    data: {type: String },
})
module.exports = mongoose.model('ImageFragment',ImageFragmentSchema)