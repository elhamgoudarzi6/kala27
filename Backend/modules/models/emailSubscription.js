const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const EmailNewsletterSchema = new Schema({
    email: { type: String},
});
module.exports = mongoose.model('EmailNewsletter', EmailNewsletterSchema);