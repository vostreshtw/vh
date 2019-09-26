const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// Passport Config
require('./config/passport')(passport);

// Connect to MongoDB
mongoose.connect('mongodb+srv://htwvietnam:1234@loginvietnam-aw6ey.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', function() {
    console.log('Conection has been made!');
}).on('error', function(error) {
    console.log('Error is: ', error);
});

//CSS/JS/IMG Connection
app.use(express.static(__dirname + '/public'));

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Express body parser
app.use(express.urlencoded({ extended: false }));

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
    next();
});

//Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

const Joi = require('joi');
const db = require("./db");
const collection = "dish";

const schema = Joi.object().keys({
    Name: Joi.string().required(),
    preis: Joi.number().required()
})



app.get('/getdishes', (req, res) => {
    db.getDB().collection(collection).find({}).toArray((err, documents) => {
        if (err) console.log(err);
        else {
            console.log(documents);
            res.json(documents);
        }
    });
});


app.get('/searchdishes', (req, res) => {
    db.getDB().collection(collection).find({
        $text: {
            $search: req.query.search
        }
    }).toArray((err, documents) => {
        if (err) console.log(err);
        else {
            console.log(documents);
            res.json(documents);
        }
    });
});


app.put('/:id', (req, res) => {
    const dishID = req.params.id;
    const userInput = req.body;

    db.getDB().collection(collection).findOneAndUpdate({ _id: db.getPrimaryKey(dishID) }, { $set: { Name: userInput.Name, preis: userInput.preis } }, { returnOriginal: false }, (err, result) => {
        if (err) console.log(err);
        else { res.json(result); }
    });
});




app.post('/', (req, res, next) => {
    const userInput = req.body;

    Joi.validate(userInput, schema, (err, result) => {
        if (err) {
            const error = new Error('FEHLER!');
            error.status = 400;
            next(error);
        } else {
            db.getDB().collection(collection).insertOne(userInput, (err, result) => {
                if (err) {
                    const error = new Error('FEHLER');
                    error.status = 400;
                    next(error);
                } else

                    res.json({ result: result, document: result.ops[0], msg: "Neues Gericht wurde erfolgreich hinzugefügt", error: null });
            });
        }
    })

});


app.delete('/:id', (req, res) => {
    const dishID = req.params.id;

    db.getDB().collection(collection).findOneAndDelete({ _id: db.getPrimaryKey(dishID) }, (err, result) => {
        if (err) console.log(err);
        else res.json(result);
    });
});

app.use((err, req, res, next) => {
    res.status(err.status).json({
        error: {
            message: err.message
        }
    });
})

function newFunction(req) {
    return req.query.search;
}


app.set('port', (process.env.PORT || 4000))
//const PORT = process.env.PORT || 4000;

db.connect((err) => {
    if (err) {
        console.log('kein Zugriff auf Datenbank');
        process.exit(1);
    } else {
        
        app.listen(app.get('port'), function() {
            console.log("Node app is running at localhost:" + app.get('port'))
          })
    }
})