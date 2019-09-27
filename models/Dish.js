const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DishSchema = new Schema({
    Name: {
        type: String,
        // required: true
    },
    preis: {
        type: Number,
        //  required: true
    },
});

module.exports = mongoose.model('Dish', DishSchema);