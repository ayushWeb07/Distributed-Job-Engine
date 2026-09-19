import * as Joi from 'joi';

export default Joi.object({
  SERVER_PORT: Joi.number().required().port(),
  DRIZZLE_URI: Joi.string().required(),
});
