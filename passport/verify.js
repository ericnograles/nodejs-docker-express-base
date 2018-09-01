
module.exports = async (profile, next) => {
  let emailPath = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress';
  let email = profile[emailPath];
  // TODO: This is where you'd look up a user's existence in your local database
  // to get application level permissions
  let user = {
    email
  };
  return next(null, user);
};
