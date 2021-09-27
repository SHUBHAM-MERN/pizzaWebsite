const User = require('../../models/user');
const bcrtpt = require('bcrypt');

function authcontroller() {

    return {
       async register(req, res) {
            const { name, email, password } = req.body;

            User.exists({ email: email }, async (err, result) => {
                if (result) {
                    req.flash('error', "Email Already Registered")
                    req.flash('name', name)
                    req.flash('email', email)
                    return res.redirect('/signup');
                }
                else {
                    const hashpassword = await bcrtpt.hash(password, 10);

            
            const user = new User({
                name,
                email,
                password: hashpassword,
            })
            await user.save();
        
               
            res.redirect('/signin'); 
                }
                
            }
            )
           


        }
    }

}
module.exports = authcontroller;