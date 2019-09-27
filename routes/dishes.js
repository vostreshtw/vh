const express = require('express');
const router = express.Router();
// Dish model
const Dish = require('../models/Dish');

//GET DISHES
router.get('/', (req, res) => {
    var noMatch = null;
    if (req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        // Get all dishes from DB
        Dish.find({ Name: regex }, (err, allDishes) => {
            if (err) {
                console.log(err);
            } else {
                if (allDishes.length < 1) {
                    noMatch = "Kein Gericht gefunden";
                }

                res.render('dishes/crud', { dishes: allDishes, noMatch: noMatch });

            }
        });
    } else {
        // Get all dishes from DB
        Dish.find({}, (err, allDishes) => {
            if (err) console.log(err);
            else {

                res.render('dishes/crud', { dishes: allDishes, noMatch: noMatch });

            }
        });
    }
});



router.get('/angebot', (req, res) => {

    // Get all dishes from DB
    Dish.find({}, (err, allDishes) => {
        if (err) console.log(err);
        else {
            res.render('angebot', { dishes: allDishes });

        }
    });

});

// SHOW
router.get("/:id", (req, res) => {

    Dish.findById(req.params.id).populate().exec((err, foundDish) => {
        if (err) {
            console.log(err);
        } else {
            console.log(foundDish);

            res.render('dishes/show', { dish: foundDish });
        }
    });
});


//CREATE
router.post("/", (req, res) => {


    //get data from Form and add to dishes Array
    var Name = req.body.Name;
    var preis = req.body.preis;
    var newDish = new Dish({ Name: Name, preis: preis });
    if (!newDish.$isEmpty('preis') && !newDish.Name == '') {
        Dish.create(newDish, (err, newlyCreated) => {
            if (err) {
                console.log(err);
            } else {

                console.log(newlyCreated);
                res.render("/dishes/crud", { nachricht: 'ERFOLGREICH' });
                res.redirect("/dishes/crud");
            }
        });
    } else {
        res.render("/dishes/crud", { nachricht: 'FEHLER' });
        res.redirect("/dishes/crud");

    }
});


// EDIT ROUTE
router.get("/:id/edit", (req, res) => {
    Dish.findById(req.params.id, (err, foundDish) => {
        res.render('dishes/edit', { dish: foundDish });
    });
});

//UPDATE
router.put('/:id', (req, res) => {
    const dishID = req.params.id;
    // var Name = req.body.Name;
    // var preis = req.body.preis;
    //  var updatedDish = new Dish({ Name: Name, preis: preis });
    Dish.findByIdAndUpdate(dishID, req.body.dish, (err) => {
        if (err) {
            console.log(err);
            res.redirect("/dishes");
        } else { res.redirect("/dishes/" + dishID); }
    });
});

// DELETE
router.delete("/:id", (req, res) => {

    Dish.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            res.redirect("/dishes");
        } else {
            res.redirect("/dishes");
        }
    });
});

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;