// Dependencies
// Express.js connection
const router = require('express').Router();
const { User,Personal, Stats } = require('../models');
// Express Session for the session data
const session = require('express-session');
// Authorization  Helper
const withAuth = require('../utils/auth');
// Sequelize store to save the session so the user can remain logged in
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Routes

// GET /api/statsdetails -- get all stats data
router.get('/', withAuth, (req, res) => {
    // Access the stats model and run .findAll() method to get all stats
    Stats.findAll({
        where: {
            // use the ID from the session
            user_id: req.session.user_id
          }
    })
      // return the data as JSON formatted
      .then(dbStatsData => {
      const stats = dbStatsData.map(stat => stat.get({ plain: true }));
      res.render('statsdetails', {stats, loggedIn: true});
})
      // if there is a server error, return that error
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  module.exports = router;