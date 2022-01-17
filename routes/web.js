
const homecontroller = require('../app/https/controller/homecontroller')
const registraton = require('../app/https/controller/registration')
const cartcontroller = require('../app/https/controller/cartcontroller')
const authcontroller = require('../app/https/controller/authcontroller')
const ordercontroller = require('../app/https/controller/ordercontroller')
const admincontroller = require('../app/https/controller/admin/admincontroller')
const auth = require('../app/https/middleware/auth')
const passport= require('passport')
const order = require('../app/models/order')

function initRouts(app) {

    app.get('/', homecontroller().index)
    app.get('/cart', cartcontroller().index)
    app.get('/signin',auth, registraton().signin)
    app.get('/signup', auth,registraton().signup)
    app.get('/order',ordercontroller().index)
    app.get('/admin/order',admincontroller().order)
    app.post('/admin/order/update',admincontroller().update)
    app.post('/login', authcontroller().login)
    app.post('/register', authcontroller().register)
    app.post('/update', cartcontroller().update)
    app.post('/additom', cartcontroller().add)
    app.post('/removeitom', cartcontroller().remove)
    app.post('/order', ordercontroller().order)

}
module.exports = initRouts;