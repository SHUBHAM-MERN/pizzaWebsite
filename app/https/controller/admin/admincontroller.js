const Order = require('../../../models/order');

function admincontrolller() {
    return {
      async  order(req, res) {
            const data = await Order.find({ status: { $ne: 'completed' } }, null, { sort: { 'createdAt': -1 } }).populate('orderID','-password')
            
            res.render('admin/order',{data:data})
        },
     async   update(req, res) {
         const data = req.body;
         console.log(data.status)
         await Order.findOneAndUpdate({ _id: data._id }, { $set: { status: 'completed' }})
         res.send("succesfull")
        }
    }
}
module.exports = admincontrolller;