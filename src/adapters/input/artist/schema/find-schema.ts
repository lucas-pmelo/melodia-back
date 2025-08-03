import Joi from 'joi';

export const findArtistSchema = Joi.object({
  id: Joi.string().required(),
});
