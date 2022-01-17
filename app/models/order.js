const mongose = require('mongoose');



const orderschema = new mongose.Schema({
    orderID: {
        type: mongose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    items: { type: Object,required:true },
    phone: { type: Number, required: true },
    address: { type: String, required: true },
    paymentType:{type:String,default:"COD"},
    status: { type: String, default: "order_Placed" }
    

}, { timestamps: true })

module.exports = mongose.model('Order', orderschema);
