const User = require('../../models/user');
const bcrtpt = require('bcrypt');
const passport = require('passport');

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



        },
        login(req, res, next) {
            const { email, password } = req.body;
            if (!email || !password) {
                console.log("invalid")
            }
            passport.authenticate('local', (err, user, info) => {

                
                if (err) {
                    req.flash('error', info.message);
                    console.log(info.message)
                    return next(err)
                }
                if (!user) {
                    req.flash('error', info.message);
                    console.log(info.message)
                    return res.redirect('/signin')
                }

                req.logIn(user, (err) => {
                    if (err) {
                        console.log(info.message)
                        return next(err)
                    }
                    console.log(info.message)
                    return res.redirect('/')
                })
            })(req, res, next)
        }
    }

}
module.exports = authcontroller;