const logger = require('../lib/logger');

module.exports = function phase() {
  this.use((err, req, res, next) => {
    logger.error(err);

    if (process.env.NODE_ENV !== 'production') {
      return res.status(500).json({
        error_code: 'internal_server_error',
        error_description: 'An internal server error occured',
        error: err
      });
    }

    return res.status(500).json({
      error_code: 'internal_server_error',
      error_description: 'An internal server error occured'
    });
  });
};
