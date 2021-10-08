const readlineSync = require('readline-sync');

function read() {
  return readlineSync.question('\u03bb: ');
}

module.exports = read;
