const session = require('express-session')
const homecontroller = require('../app/https/controller/homecontroller')
const registraton = require('../app/https/controller/registration')
const cartcontroller=require('../app/https/controller/cartcontroller')
const authcontroller=require('../app/https/controller/authcontroller')

function initRouts(app) {

    app.get('/', homecontroller().index)
    app.get('/cart', cartcontroller().index)
    app.get('/signin', registraton().signin)
    app.get('/signup', registraton().signup)
    app.post('/register', authcontroller().register)
    app.post('/update', cartcontroller().update)
    app.post('/additom', cartcontroller().add)
    app.post('/removeitom', cartcontroller().remove)

}
module.exports = initRouts;