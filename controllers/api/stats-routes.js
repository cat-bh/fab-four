// Dependencies
// Express.js connection
const router = require('express').Router();
// User, Post, Vote models
const { User, Post, Comment, Personal, Stats } = require('../../models');
// Authorization  Helper
const withAuth = require('../../utils/auth');

// Routes

// GET /api/stats -- get all stats data
router.get('/', (req, res) => {
    // Access the Personal model and run .findAll() method to get all users
    Stats.findAll({
        where: {
            // use id as the parameter for the request
            user_id: req.params.user_id
          },
    })
      // return the data as JSON formatted
      .then(dbStatsData => {
      const stats = dbStatsData.map(stat => stat.get({ plain: true }));
      res.render('stats', {dbStatsData, loggedIn: true});
})
      // if there is a server error, return that error
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// GET /api/stats/1 -- get a single user by id
router.get('/:id', (req, res) => {
    // Acess the User model and run the findOne() method to get a single user based on parameters
    Stats.findOne({
      // when the data is sent back, exclude the password property
      where: {
        // use id as the parameter for the request
        id: req.params.id
      },
    })
      .then(dbStatsData => {
        if (!dbStatsData) {
          // if no user is found, return an error
          res.status(404).json({ message: 'No stats found with this id' });
          return;
        }
        // otherwise, return the data for the requested user
        res.json(dbStatsData);
      })
      .catch(err => {
        // if there is a server error, return that error
        console.log(err);
        res.status(500).json(err);
      });
  });

// POST /api/stats -- add a new user
router.post('/', (req, res) => {
  // create method
  // expects an object in the form {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
  Stats.create({
    activity: req.body.activity,
    distance: req.body.distance,
    calories_burned: req.body.calories_burned,
    calories_intake: req.body.calories_intake,
    water: req.body.water,
    user_id: req.session.user_id
  })
    // send the user data back to the client as confirmation and save the session
    .then(dbStatsData => {
      req.session.save(() => {
        req.session.id = dbStatsData.id;
        req.session.activity = dbStatsData.activity;
        req.session.distance = dbStatsData.distance;
        req.session.calories_burned = dbStatsData.calories_burned;
        req.session.calories_intake = dbStatsData.calories_intake;
        req.session.water = dbStatsData.water;
        req.session.user_id = dbStatsData.user_id;
        req.session.loggedIn = true;
    
        res.json(dbStatsData);
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
    Stats.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbStatsData => {
        if (!dbStatsData) {
          res.status(404).json({ message: 'No Stats data found with this id' });
          return;
        }
        res.json(dbStatsData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;
