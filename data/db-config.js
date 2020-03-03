const knex = require('knex');

const environment = process.env.DB_ENV || 'development';
console.log(environment);
const config = require('../knexfile.js')[environment];

module.exports = knex(config);