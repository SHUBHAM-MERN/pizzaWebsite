const PORT = 3000;
const path = require('path');


const express = require('express');
const initRouts = require('./routes/web');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');


const passport = require('passport');

require('dotenv').config();
const MongoDbStore = require('connect-mongo');
const mongoose = require('mongoose');
const flash = require('express-flash');


const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "/resources/views"));

app.use(express.json())
app.use(expressLayouts)

app.use(express.static("public"))
app.use(express.urlencoded({ extended: false }))


app.use(
    session({
        secret: 'story book',
        resave: true,
        saveUninitialized: true,
        rolling: true,
        store: MongoDbStore.create({
            mongoUrl: 'mongodb://localhost:27017/PizzaBase',
            collectionName: 'sessions'
        }),
        cookie: { maxAge: 1000000 }
    })
);

// passport 
const init = require('./app/config/pasport');
init(passport)
app.use(passport.initialize())
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.session = req.session;
    res.locals.user = req.user;
    next();
})
app.use(flash());





mongoose.connect('mongodb://localhost:27017/PizzaBase', { useUnifiedTopology: true, useNewUrlParser: true }).then(() => {
    console.log("conection sucsesfull...")
}).catch((err) => {
    console.log(err);
});
// mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true);

initRouts(app);

app.listen(PORT, () => {
    console.log(`listning to server ${PORT}`)
})