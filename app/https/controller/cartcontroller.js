

function cartcontroller() {
    return {
       
        index(req, res) {
            
            
            res.render("cart",{cart:req.session.cart})
        },
        update(req, res){
            const data = req.body;
            if (!req.session.cart) {
                let cart = {
                    itoms: [],
                    totalqty: 0,
                    totalPrice:0
                }
                req.session.cart = cart;
            }
       
    
            if (req.session.cart.itoms.length == 0) {
                req.session.cart.itoms.push({ itom: data, count: 1 });
                req.session.cart.totalqty=1;
                req.session.cart.totalPrice = data.price;
            }
            else {
                let i = 0;
                req.session.cart.itoms.forEach((val, index, arr) => {
                    if (val.itom._id == data._id) {
                        arr[index].count++;
                        req.session.cart.totalqty++;
                        req.session.cart.totalPrice += data.price;
                        i = 1;
                    
                    }
                })
    
                if (i != 1) {
                    
                    req.session.cart.itoms.push({ itom: data, count: 1 });
                    req.session.cart.totalqty++;
                    req.session.cart.totalPrice += data.price;
                    
                }
            }
    
            res.json({cart:req.session.cart});
        },
        add(req, res) {
            const data = req.body;
            req.session.cart.itoms.forEach((pizza,index,arr) => {
                if (pizza.itom._id == data.itom._id) {
                    arr[index].count++;
                    req.session.cart.totalqty++;
                    req.session.cart.totalPrice += data.itom.price;
                }
            })
            res.json({cart:req.session.cart});
        },
        remove(req, res) {
            var flag = 0;
            const data = req.body;
           
            if (data.count == 1) {
               req.session.cart.itoms= req.session.cart.itoms.filter((pizza) => {
                    return pizza.itom._id != data.itom._id;
               })
               req.session.cart.totalqty--;
               req.session.cart.totalPrice -= data.itom.price;
                flag = 1;
            }
            else {
                
                req.session.cart.itoms.forEach((pizza, index, arr) => {
                   
                    if (pizza.itom._id == data.itom._id) {
                      
                        arr[index].count--;
                        req.session.cart.totalqty--;
                        req.session.cart.totalPrice -= data.itom.price;
                    }
                })
            }
            res.json({ cart: req.session.cart, flag: flag });
        
        }

    }
}
module.exports = cartcontroller;