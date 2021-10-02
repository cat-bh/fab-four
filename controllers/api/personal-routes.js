// Dependencies
// Express.js connection
const router = require('express').Router();
// User, Post, Vote models
const { User, Post, Comment, Personal } = require('../../models');
// Express Session for the session data
const session = require('express-session');
// Authorization Helper
const withAuth = require('../../utils/auth');
// Sequelize store to save the session so the user can remain logged in
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Routes

// GET /api/personal -- get all personal data
router.get('/', (req, res) => {
    // Access the Personal model and run .findAll() method to get all users
    Personal.findAll({
        
    })
      // return the data as JSON formatted
      .then(dbPersonalData => res.json(dbPersonalData))
      // if there is a server error, return that error
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// GET /api/personal/1 -- get a single user by id
router.get('/:id', (req, res) => {
    // Acess the User model and run the findOne() method to get a single user based on parameters
    Personal.findOne({
      // when the data is sent back, exclude the password property
      where: {
        // use id as the parameter for the request
        id: req.params.id
      },
    })
      .then(dbPersonalData => {
        if (!dbPersonalData) {
          // if no user is found, return an error
          res.status(404).json({ message: 'No personal found with this id' });
          return;
        }
        // otherwise, return the data for the requested user
        res.json(dbPersonalData);
      })
      .catch(err => {
        // if there is a server error, return that error
        console.log(err);
        res.status(500).json(err);
      });
  });

// POST /api/personal -- add a new user
router.post('/', (req, res) => {
  // create method
  // expects an object in the form {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
  Personal.create({
    weight: req.body.weight,
    goal_weight: req.body.goal_weight,
    user_id: req.body.user_id
  })
    // send the user data back to the client as confirmation and save the session
    .then(dbPersonalData => {
      req.session.save(() => {
        req.session.id = dbPersonalData.id;
        req.session.weight = dbPersonalData.weight;
        req.session.goal_weight = dbPersonalData.goal_weight;
        req.session.user_id = dbPersonalData.user_id;
    
        res.json(dbPersonalData);
      });
    })
    // if there is a server error, return that error
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// DELETE /api/users/1 -- delete an existing user
router.delete('/:id', withAuth, (req, res) => {
    // destroy method
    Personal.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbPersonalData => {
        if (!dbPersonalData) {
          res.status(404).json({ message: 'No personal data found with this id' });
          return;
        }
        res.json(dbPersonalData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;
