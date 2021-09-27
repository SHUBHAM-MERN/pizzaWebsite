const PORT = 3000;
const path = require('path');


const express = require('express');
const initRouts = require('./routes/web');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const MongoDbStore = require('connect-mongo');
require('dotenv').config();
const mongoose = require('mongoose');
const flash = require('express-flash');


const app = express();

app.use(express.json())
app.use(expressLayouts);
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
app.use((req, res, next) => {
    res.locals.session = req.session;

    next();
})


app.use(flash());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "/resources/views"));


mongoose.connect('mongodb://localhost:27017/PizzaBase', { useUnifiedTopology: true, useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
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