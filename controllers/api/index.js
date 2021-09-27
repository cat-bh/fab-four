// An index file to gather the API routes and export them for use

// Dependencies
// Server connection
const router = require('express').Router();
// User Routes
const userRoutes = require('./user-routes');

// Personal Routes
const personalRoutes = require('./personal-routes');

// Stats Routes
const statsRoutes = require('./stats-routes');

// Define route path for the API to use, e.g. api/users/
router.use('/users', userRoutes);

// Define route path for the API to use, e.g. api/personal/
router.use('/personal', personalRoutes);

// Define route path for the API to use, e.g. api/stats/
router.use('/stats', statsRoutes);

// Export the router
module.exports = router;