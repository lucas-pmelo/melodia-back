import Joi from 'joi';

export const createArtistSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  image: Joi.string(),
  genre: Joi.array().items(Joi.string()),
});
