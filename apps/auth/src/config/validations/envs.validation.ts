import * as Joi from 'joi';

export default Joi.object({
  SERVER_PORT: Joi.number().required().port(),
  AUTH_JWT_SECRET: Joi.string().required(),
  AUTH_JWT_EXPIRES: Joi.number().required(),
  DRIZZLE_URI: Joi.string().required(),
});
