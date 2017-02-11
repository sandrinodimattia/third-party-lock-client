# Third Party Hosted Lock - Client

## Configuration

Heroku:

```bash
heroku config:set CLIENT_URL=https://third-party-lock-attacker.herokuapp.com
heroku config:set LOGIN_ENDPOINT=https://third-party-lock-authz.herokuapp.com/login
heroku config:set TOKEN_ENDPOINT=https://third-party-lock-authz.herokuapp.com/oauth/token
heroku config:set SESSION_ENDPOINT=https://third-party-lock-authz.herokuapp.com/session
```
