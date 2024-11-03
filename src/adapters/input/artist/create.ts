import {
  Controller,
  Request,
  Response,
  ValidationError,
} from '@lucas-pmelo/lambda-handlers';
import logger from '@lucas-pmelo/logger';
import { validateSchema } from '@lucas-pmelo/validator';
import { createArtistSchema } from './schema/create-schema';
import { ArtistResponse } from './presenters/dtos/create';
import { ArtistPresenter } from './presenters/artist';
import { CreateArtistUseCase } from '~/domain/artist/use-case/create';

export class CreateArtistHandler {
  constructor(private readonly createArtistUseCase: CreateArtistUseCase) {}

  handler: Controller = async (
    request: Request,
  ): Promise<Response<ArtistResponse>> => {
    const { body } = request;

    logger.info({
      message: 'Create artist request',
      data: request,
    });

    const { data, errors } = validateSchema(createArtistSchema, body);

    const hasValidationErrors = errors?.length;

    if (hasValidationErrors) {
      logger.warn({
        message: 'Create artist validation error',
        data: errors,
      });

      throw new ValidationError('Invalid request data', errors);
    }

    const artist = await this.createArtistUseCase.execute(data);

    logger.info({
      message: 'Create artist response',
      data: artist,
    });

    return {
      statusCode: 201,
      body: ArtistPresenter.toHttp(artist),
    };
  };
}
