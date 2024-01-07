const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const InventorySchema = new Schema({
    productID:{ type:mongoose.Schema.ObjectId,require, ref:'Product'},
    count: { type: Number },
},{toJSON:{virtuals:true}});
InventorySchema.virtual('product',{
    ref:'Product',
    localField:'productID',
    foreignField:'_id',
});
module.exports = mongoose.model('Inventory', InventorySchema);
