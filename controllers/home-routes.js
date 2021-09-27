const router = require('express').Router();
const sequelize = require('../config/connection');
const { Personal , User, Stats } = require('../models');

// Render the home page
router.get('/', (req, res) => {
  User.findAll({
      // Query configuration
      // From the Post table, include the post ID, URL, title, and the timestamp from post creation
      attributes: [
          'id',
          'username'
        ],
  })
  // render the users
  .then(dbUserData => {
    const users = dbUserData.map(user => user.get({ plain: true }));
    // Render homepage
    res.render('homepage', {
      users,
      loggedIn: req.session.loggedIn
    });
  })
  // if there was a server error, return the error
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

// Render the login page.  If the user is logged in, redirect to the home page.
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });

// Render the sign up page.  If the user is logged in, redirect to the home page.
router.get('/signup', (req, res) => {
   if (req.session.loggedIn) {
     res.redirect('/');
     return;
  }

  res.render('signup');
});

module.exports = router;

