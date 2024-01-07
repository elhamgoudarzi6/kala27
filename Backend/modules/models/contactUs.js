const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ContactUsSchema = new Schema({
    fullName: { type: String},
    email: { type: String},
    title: { type: String},
    message:{ type: String},
},{timestamps:true});
module.exports = mongoose.model('ContactUs', ContactUsSchema);