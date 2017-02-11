const morgan = require('morgan');
const cookies = require('cookie-parser');
const bodyParser = require('body-parser');

const logger = require('../lib/logger');

module.exports = function phase(done) {
  this.use(morgan(':method :url :status :response-time ms - :res[content-length]', {
    stream: {
      write: (message) => {
        logger.debug(message.replace(/\n$/, ''));
      }
    }
  }));

  this.use(cookies());
  this.use(bodyParser.json());
  this.use(bodyParser.urlencoded({ extended: false }));

  done();
};
