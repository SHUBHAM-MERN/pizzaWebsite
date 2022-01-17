const Localstatergy = require('passport-local').Strategy;
const User = require('../models/user')
const bcrypt = require('bcrypt');

function init(passport) {

    passport.use(new Localstatergy({ usernameField: 'username',passwordField:'password' }, async (email, password, done) => {


        const user = await User.findOne({ email: email });
        
        if (!user) {
            return done(null, false, { message: "user is invalid" })

        }

    //    return done(null,user,{message:"successfull"})
        const result = await bcrypt.compare(password, user.password);
        if (result) {
            return done(null, user, {
                message: "Login Successfull"
            })
        }
        
            return done(null, false, { message: "Invalid Password or Username" });
        


    }))
    passport.serializeUser((user, done) => {
         done(null, user._id);
    })
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
             done(err, user)
        })
    })

}
module.exports = init;