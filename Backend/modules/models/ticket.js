const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TicketSchema = new Schema({
    userID: { type:mongoose.Schema.ObjectId,require, ref:'User'},
    ticketNumber: { type: String},
   title: { type: String},
   detail:[{message:String,date:String,time:String}],
},{toJSON:{virtuals:true}});
TicketSchema.virtual('User',{
    ref:'User',
    localField:'userID',
    foreignField:'_id',
});
module.exports = mongoose.model('Ticket', TicketSchema);