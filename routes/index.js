const express = require('express');
const router = express.Router();

const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('index', {
    name: ' '
}));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
    res.render('dashboard', {
        name: req.user.name
    })
);

// Crud
router.get('/dishes/crud', ensureAuthenticated, (req, res) =>
    res.render('dishes/crud', {
        name: req.user.name
    })
);

// 
router.get('/dishes/edit', ensureAuthenticated, (req, res) =>
    res.render('dishes/edit', {
        name: req.user.name
    })
);


// Crud
router.get('/dishes/show', ensureAuthenticated, (req, res) =>
    res.render('dishes/show', {
        name: req.user.name
    })
);

// Angebot
router.get('/angebot', (req, res) =>
    res.render('angebot', {
        name: ' '
    })
);

// Impressum
router.get('/impressum', (req, res) =>
    res.render('impressum', {
        name: ' '
    })
);



module.exports = router;