const { User } = require('../models');

const userData = [
  {
    username: "Cat",
    password: "password1234"
  },
  {
    username: "Jaya",
    password: "password1234"
  },
  {
    username: "Mark",
    password: "password1234"
  },
  {
    username: "shane",
    password: "password1234"
  },
  {
    username: "John",
    password: "password1234"
  }
];

const seedUsers = () => User.bulkCreate(userData);

//  WARNING seed bulk create does NOT hash the password, so they must be hashed via the update route before the login route will work!

module.exports = seedUsers;
