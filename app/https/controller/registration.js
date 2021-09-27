function registration() {
    return {
        signin(req, res) {
            res.render("login",{layot:0})
        },
        signup(req, res) {
            res.render("signup")
        }
        
    }
}
module.exports = registration;