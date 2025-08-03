import {
  Controller,
  Request,
  Response,
  ValidationError,
} from '@lucas-pmelo/lambda-handlers';
import logger from '@lucas-pmelo/logger';
import { validateSchema } from '@lucas-pmelo/validator';
import { FindArtistUseCase } from '~/domain/artist/use-case/find';
import { ArtistPresenter } from './presenters/artist';
import { ArtistResponse } from './presenters/dtos/create';
import { findArtistSchema } from './schema/find-schema';

export class FindArtistHandler {
  constructor(private findArtistUseCase: FindArtistUseCase) {}

  handler: Controller = async (
    request: Request,
  ): Promise<Response<ArtistResponse>> => {
    const { id } = request.pathParameters;

    logger.info({
      message: 'Find artist request',
      data: request,
    });

    const { data, errors } = validateSchema(findArtistSchema, { id });

    const hasValidationErrors = errors?.length;

    if (hasValidationErrors) {
      logger.warn({
        message: 'Find artist validation error',
        data: errors,
      });

      throw new ValidationError('Invalid request data', errors);
    }

    const artist = await this.findArtistUseCase.execute(data);

    logger.info({
      message: 'Find artist response',
      data: artist,
    });

    return {
      statusCode: 200,
      body: ArtistPresenter.toHttp(artist),
    };
  };
}
