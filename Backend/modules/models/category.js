const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const CategorySchema = new Schema({
    title: { type: String, required: true },
},{toJSON:{virtuals:true}});
CategorySchema.virtual('SubCategory',{
    ref:'SubCategory',
    localField:'_id',
    foreignField:'categoryID',
});

module.exports = mongoose.model('Category', CategorySchema);
