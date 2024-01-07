const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const AdminSchema = new Schema({
    username: { type: String, required: false },
    password: { type: String, required: true },
    adminName: { type: String },
    image: { type: String },
    type:{type:String},
});
AdminSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10, (err, hash) => {
        this.password = hash;
        next();
    });
})
module.exports = mongoose.model('Admin', AdminSchema);
