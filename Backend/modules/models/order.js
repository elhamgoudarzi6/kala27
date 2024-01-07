const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const OrderSchema = new Schema({
    userID:{ type:mongoose.Schema.ObjectId,require, ref:'User'},
    productID: { type:mongoose.Schema.ObjectId, ref:'Product'},
    count: { type: String },
    description: { type: String },
    date: { type: String},
    statusOrder: { type: String,default:'ثبت سفارش'}
},{timestamps:true,toJSON:{virtuals:true}});
OrderSchema.virtual('Product',{
    ref:'Product',
    localField:'productID',
    foreignField:'_id',
});
OrderSchema.virtual('User',{
    ref:'User',
    localField:'userID',
    foreignField:'_id',
});
module.exports = mongoose.model('Order', OrderSchema);
