const joi = require('joi');
const envVarsSchema = joi
  .object({
    SAML_CALLBACK_URL: joi.string().required(),
    SAML_ISSUER: joi.string().required(),
    SAML_SIGNING_CERT: joi.string().required(),
    SAML_ENTRY_POINT: joi.string().required(),
  })
  .unknown()
  .required();

const { error } = joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Missing environment variables detected! ${error.message}`);
}

const RUNTIME = {
  NODE_ENV: process.env.NODE_ENV
};

const SAML = {
  SAML_CALLBACK_URL: process.env.SAML_CALLBACK_URL,
  SAML_ISSUER: process.env.SAML_ISSUER,
  SAML_SIGNING_CERT: process.env.SAML_SIGNING_CERT,
  SAML_ENTRY_POINT: process.env.SAML_ENTRY_POINT
}


module.exports = {
  RUNTIME
};
