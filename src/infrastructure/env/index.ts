import { SecretProps } from '@lucas-pmelo/database/lib/postgres/pg/pg-pool';
import Joi from 'joi';

interface EnvSchemaProps {
  SERVICE: string;
  DATABASE: SecretProps;
}

export const envSchema = Joi.object({
  SERVICE: Joi.string(),
  DATABASE: Joi.object(),
});

const { value } = envSchema.validate(process.env);

export const env = value as EnvSchemaProps;
