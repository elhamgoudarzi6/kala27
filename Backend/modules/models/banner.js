const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BannerSchema = new Schema({
    imageurl: { type: String, required: true },
    link:{type:String},
})
module.exports = mongoose.model('Banner', BannerSchema);