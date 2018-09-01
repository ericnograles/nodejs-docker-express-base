const passport = require('passport');
const SAMLStrategy = require('passport-saml').Strategy;
const { SAML } = require('../env');
const verify = require('./verify');
const redirect = require('./redirect');

module.exports = SAMLProvider;

function SAMLProvider(app) {
  const {
    SAML_CALLBACK_URL,
    SAML_ISSUER,
    SAML_SIGNING_CERT,
    SAML_ENTRY_POINT,
  } = SAML;

  const callbackUrl = SAML_CALLBACK_URL;
  const issuer = SAML_ISSUER;
  let cert = SAML_SIGNING_CERT;
  const entryPoint = SAML_ENTRY_POINT;

  // Initial entry point
  app.get('/__/auth/saml', (req, res, next) => {
    req.body.RelayState = JSON.stringify(req.query);

    passport.authenticate('saml', async (err, user, info) => {
      if (err || !user) return res.redirect('/__/auth/saml/error');
      return res.json(user);
    })(req, res, next);
  });

  app.post(
    '/__/auth/saml/callback',
    passport.authenticate('saml', {
      failureRedirect: '/__/auth/saml/error',
      session: false
    }),
    redirect
  );

  app.get('/__/auth/saml/error', (req, res) =>
    res
      .status(401)
      .json({ message: `Could not authenticate, please try again` })
  );

  const samlConfig = {
    callbackUrl,
    entryPoint,
    issuer,
    cert,
    acceptedClockSkewMs: -1
  };

  return new SAMLStrategy(samlConfig, verify);
}
