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
router.get('/crud', ensureAuthenticated, (req, res) =>
    res.render('crud', {
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

// Search
router.get('/search', (req, res) =>
    res.render('search', {
        name: ' '
    })
);

module.exports = router;