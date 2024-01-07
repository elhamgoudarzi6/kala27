const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SendCostSchema = new Schema({
    cost: { type: String},
});
module.exports = mongoose.model('SendCost', SendCostSchema);