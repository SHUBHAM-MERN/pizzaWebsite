const mongose = require('mongoose');


const userschema = new mongose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "customer" }

}, { timestamps: true })

module.exports = mongose.model('User', userschema);
