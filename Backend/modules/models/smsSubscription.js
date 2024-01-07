const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SmsNewsletterSchema = new Schema({
    mobile: { type: String},
});
module.exports = mongoose.model('SmsNewsletter', SmsNewsletterSchema);