const { readFileSync } = require('fs');
const { resolve } = require('path');

module.exports = {
  ports: {
    http: 80,
    https: 443,
  },
  ssl: {
    cert: readFileSync( resolve('CERT_PATH')),
    key: readFileSync( resolve('KEY_PATH')),
  }
};