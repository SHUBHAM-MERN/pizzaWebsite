const menu = require('../../models/menu')
function homecontroller() {
    return {
        async index(req, res) {
            const pizzas = await menu.find();
            res.render("home", { pizzas: pizzas })
        },
        cart(req, res) {
            
            res.render("cart",{cart:req.session.cart})
        }

    }
}
module.exports = homecontroller;