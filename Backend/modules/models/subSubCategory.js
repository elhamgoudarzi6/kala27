const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SubSubCategorySchema = new Schema({
    subCategoryID:{ type:mongoose.Schema.ObjectId,require, ref:'SubCategory'},
    title: { type: String, required: true },
});
module.exports = mongoose.model('SubSubCategory', SubSubCategorySchema);
