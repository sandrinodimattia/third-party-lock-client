const crypto = require('crypto');
const request = require('superagent');

const utils = require('../lib/utils');
const logger = require('../lib/logger');

module.exports = function phase() {
  this.get('/', (req, res) => {
    const state = crypto.randomBytes(20).toString('hex');
    res.cookie('state', state);

    res.render('home', {
      loginUrl: utils.generateLoginUrl(state),
      xsrfToken: utils.generateXsrfToken(state, req)
    });
  });

  this.get('/callback', (req, res) => {
    logger.info(req.query, 'Callback');

    // Error from the authorization server?
    if (req.query.error) {
      return res.render('error', {
        error: req.query.error
      });
    }

    // Validate the state.
    if (req.query.state !== req.cookies.state) {
      return res.render('error', {
        error: 'Invalid state'
      });
    }

    // Token exchange.
    request
      .post(process.env.TOKEN_ENDPOINT)
      .send({
        code: req.query.code,
        grant_type: 'authorization_code_extended'
      })
      .set('Accept', 'application/json')
      .end((err, response) => {
        if (err && response && response.body) {
          return res.render('error', {
            error: JSON.stringify(response.body, null, 2)
          });
        } else if (err) {
          return res.render('error', {
            error: err.message || err.name
          });
        }

        return res.render('user', {
          user: response.body,
          sessionEndpoint: process.env.SESSION_ENDPOINT
        });
      });
  });
};
