const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProductSchema = new Schema({
    categoryID:{ type:mongoose.Schema.ObjectId,require, ref:'Category'},
    subCategoryID: { type:mongoose.Schema.ObjectId,require, ref:'SubCategory'},
    subSubCategoryID: { type:mongoose.Schema.ObjectId,require, ref:'SubSubCategory'},
    discountID: { type:mongoose.Schema.ObjectId,require, ref:'Discount'},
    discountStatus:{type:Boolean,default:false},
    title: { type: String},
    detail: { type: String },
    features:[{feature:String,featureValues:String}],
    image: { type: String },
    help: { type: String },
    sendCost: { type: Number },
     price: { type: Number },
    info:[{color:String,price:Number,colorCode:String,image:String,initialNumber:Number,remainsNumber:Number}],
    keywords:{type:String},
    imageDescription:{type:String},
    metaDescription:{type:String},
},{timestamps:true,toJSON:{virtuals:true}});
ProductSchema.virtual('Comment',{
    ref:'Comment',
    localField:'_id',
    foreignField:'productID',
});
ProductSchema.virtual('Category',{
    ref:'Category',
    localField:'categoryID',
    foreignField:'_id',
});
ProductSchema.virtual('SubCategory',{
    ref:'SubCategory',
    localField:'subCategoryID',
    foreignField:'_id',
});
ProductSchema.virtual('SubSubCategory',{
    ref:'SubSubCategory',
    localField:'subSubCategoryID',
    foreignField:'_id',
});
ProductSchema.virtual('Discount',{
    ref:'Discount',
    localField:'discountID',
    foreignField:'_id',
});
module.exports = mongoose.model('Product', ProductSchema);
