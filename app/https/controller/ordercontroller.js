
const Order = require('../../models/order')
const moment = require('moment');


function ordercontroller() {

    return {
        async index(req, res) {
            const data = await Order.find({ objectID: req.user._id }, null, { sort: { 'createdAt': -1 } })
            res.render('order', { order: data, moment: moment })

        },

        order(req, res) {

            const data = new Order({
                orderID: req.user._id,
                items: req.session.cart,
                phone: req.body.phone,
                address: req.body.address,
            })
            data.save().then(data => {
                req.flash('success', 'Order Place Successfully')

                res.redirect('/order')
            }).catch(err => {
                req.flash('error', 'Unable To Place The Order ')
                res.redirect('/cart')
            })

        }

    }

}
module.exports = ordercontroller;