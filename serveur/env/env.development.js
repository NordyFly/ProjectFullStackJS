const { readFileSync } = require('fs');
const { resolve } = require('path');

module.exports = {
  ports: {
    http: 8080,
    https: 4443,
  },
  ssl: {
    cert: readFileSync( resolve('ssl', 'default.crt')),
    key: readFileSync( resolve('ssl', 'default.key')),
  }
};