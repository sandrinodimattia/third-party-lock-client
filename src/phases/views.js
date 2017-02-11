const path = require('path');

module.exports = function phase() {
  this.set('views', path.join(__dirname, '../views'));
  this.set('view engine', 'pug');
};
