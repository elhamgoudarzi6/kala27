const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const UserSchema = new Schema({
    mobile: { type: String, required: true },
    password: { type: String, required: true },
    fullName: { type: String },
    email:{type:String},
	nationalCode: { type: String},
    phone: { type: String, },
    country: { type: String},
    state: { type: String},
    city: { type: String},
    address: { type: String },
    postalCode: { type: String },
    image:{type:String},
    birthDate:{type:String},
    type:{type:String,default:'user'},
});

UserSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10, (err, hash) => {
        this.password = hash;
        next();
    });
})
module.exports = mongoose.model('User', UserSchema);
