const { ENVIRONMENT } = require('../env');
const qs = require('qs');

module.exports = async (req, res, next) => {
  try {
    let state = {};
    if (req.body.RelayState) {
      try {
        // This can come from ADFS (WSFed) or SAML
        state = JSON.parse(req.body.RelayState);
      } catch (error) {
        console.error(error);
      }
    }
    let { redirect_uri, pathname } = state;
    let redirectUrl = ENVIRONMENT.IS_LOCAL_DEVELOPMENT
      ? `${ENVIRONMENT.LOCAL_WEBCLIENT_ROOT}/token`
      : '/token';
    tokenPayload.pathname = pathname || '/';

    redirectUrl = redirect_uri || redirectUrl;
    return res.redirect(`${redirectUrl}?${qs.stringify(tokenPayload)}`);
  } catch (error) {
    return res.error(`Unrecognized user`);
  }
};
