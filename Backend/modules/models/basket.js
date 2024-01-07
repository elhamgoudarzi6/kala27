const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const BasketSchema = new Schema({
    userID: {type: mongoose.Schema.ObjectId},
    productID: {type: mongoose.Schema.ObjectId},
    resNumber: {type: String},//شناسه پرداخت
    refID: {type: String},
    infoID:{type:String},
    count:{type:String},
    price: {type: String},
    offerPercent: {type: String},
    sendCost: {type: String},
    statusProduct: {type: String},
    date: {type: String, default: '0000/00/00'},
    success: {type: String, default: 'ناموفق'},
    time: {type: String, default: '00:00:00'},
    orderTrackingCode:{type: String},
    postTrackingCode:{type: String},
    statusOrder: { type: String,default:'در حال بررسی'}
}, {toJSON: {virtuals: true}});
BasketSchema.virtual('Product',{
    ref:'Product',
    localField:'productID',
    foreignField:'_id',
});
BasketSchema.virtual('User',{
    ref:'User',
    localField:'userID',
    foreignField:'_id',
});
BasketSchema.virtual('payment', {
    ref: 'Payment',
    localField: 'userID',
    foreignField: 'userID',

});

module.exports = mongoose.model('Basket', BasketSchema);
