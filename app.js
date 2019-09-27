const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');




// Passport Config
require('./config/passport')(passport);

// Connect to MongoDB
mongoose.connect('mongodb+srv://htwvietnam:1234@loginvietnam-aw6ey.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', function() {
    console.log('Conection has been made!');
}).on('error', function(error) {
    console.log('Error is: ', error);
});

//THUY
const methodOverride = require("method-override");
app.use(methodOverride("_method"));


//CSS/JS/IMG Connection
app.use(express.static(__dirname + '/public'));

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Express body parser
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
// Express session
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());


// Global variables
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');

    res.locals.noMatch = req.flash('noMatch');
    res.locals.dishes = req.flash('dishes');
    res.locals.name = req.flash('name');
    next();
});

//Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/dishes', require('./routes/dishes'));

app.set('port', (process.env.PORT || 4000))

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));