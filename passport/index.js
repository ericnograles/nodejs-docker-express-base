const passport = require('passport');
const SAMLProvider = require('./saml');

module.exports = {
  initialize
};

function initialize(app) {
  passport.use('saml', SAMLProvider(app));
  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
  app.use(passport.initialize());

  return app;
}