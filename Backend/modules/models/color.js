const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ColorSchema = new Schema({
    code: { type: String, required: true},
    color: { type: String},
})
module.exports = mongoose.model('Color', ColorSchema);