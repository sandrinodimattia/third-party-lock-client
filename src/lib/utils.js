const crypto = require('crypto');
const logger = require('./logger');

/*
 * Generate the login url where we'll be posting the credentials to.
 * Eg: http://myauthorizationserver/login?state=123&redirect_uri=http://mysite/callback
 */
module.exports.generateLoginUrl = (state) => {
  const callbackUrl = encodeURIComponent(`${process.env.CLIENT_URL}/callback`);
  const authParams = `state=${state}&redirect_uri=${callbackUrl}`;
  return `${process.env.LOGIN_ENDPOINT}?${authParams}`;
};

/*
 * Generate an XSRF token which will be validated by the authorization server.
 * This contains elements which can practically not be used by the attacker:
 *   - The IP address of the end user
 *   - The referer (CLIENT_URL). This can be spoofed, but not in browser attacks
 *   - The state, which only exists in the user's browser
 */
module.exports.generateXsrfToken = (state, req) => {
  const xsrfToken = [
    state,
    req.ip,
    req.headers.accept,
    req.headers['user-agent'],
    `${process.env.CLIENT_URL}${req.path}`
  ];

  logger.info(xsrfToken, 'Creating XSRF token.');

  return crypto.createHash('sha256')
    .update(xsrfToken.join('|'))
    .digest('base64');
};
