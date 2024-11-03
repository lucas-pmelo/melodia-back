import { APIGatewayEvent, Context } from 'aws-lambda';
import {
  DatabaseConnection,
  DatabasePool,
  PoolFactory,
} from '@lucas-pmelo/database';
import logger from '@lucas-pmelo/logger';
import { env } from 'infrastructure/env';
import { ApiHandler } from '@lucas-pmelo/lambda-handlers';
import { UserRepository } from 'adapters/output/database/user/postgres/user-repository';
import { CreateArtistHandler } from 'adapters/input/artist/create';
import { CreateArtistUseCase } from '~/domain/artist/use-case/create';
import { ArtistRepository } from 'adapters/output/database/artist/postgres/artist-repository';

let databasePool: DatabasePool;
let createUserHandler: CreateArtistHandler;
let createArtistUseCase: CreateArtistUseCase;
let artistRepository: ArtistRepository;
let userRepository: UserRepository;
let apiHandler: ApiHandler;

const setDependencies = (databaseConnection: DatabaseConnection) => {
  userRepository = new UserRepository(databaseConnection);

  artistRepository = new ArtistRepository(databaseConnection);

  createArtistUseCase = new CreateArtistUseCase(artistRepository);

  createUserHandler = new CreateArtistHandler(createArtistUseCase);

  apiHandler = new ApiHandler(createUserHandler.handler);
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
