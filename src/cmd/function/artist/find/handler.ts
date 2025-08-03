import {
  DatabaseConnection,
  DatabasePool,
  PoolFactory,
} from '@lucas-pmelo/database';
import { ApiHandler } from '@lucas-pmelo/lambda-handlers';
import logger from '@lucas-pmelo/logger';
import { FindArtistHandler } from 'adapters/input/artist/find';
import { ArtistRepository } from 'adapters/output/database/artist/postgres/artist-repository';
import { APIGatewayEvent, Context } from 'aws-lambda';
import { env } from 'infrastructure/env';
import { FindArtistUseCase } from '~/domain/artist/use-case/find';

let databasePool: DatabasePool;
let artistRepository: ArtistRepository;
let findArtistHandler: FindArtistHandler;
let findArtistUseCase: FindArtistUseCase;
let apiHandler: ApiHandler;

const setDependencies = (databaseConnection: DatabaseConnection) => {
  artistRepository = new ArtistRepository(databaseConnection);

  findArtistUseCase = new FindArtistUseCase(artistRepository);

  findArtistHandler = new FindArtistHandler(findArtistUseCase);

  apiHandler = new ApiHandler(findArtistHandler.handler);
};

export const handler = async (event: APIGatewayEvent, context: Context) => {
  logger.setEvent(env.SERVICE, event);
  logger.debug({ message: 'Event Received', data: event });

  databasePool = await PoolFactory.getPool(env.DATABASE);
  const dbClient = await databasePool.getConnection();

  setDependencies(dbClient);

  try {
    return await apiHandler.handler(Event, context);
  } finally {
    await dbClient.release();
  }
};
