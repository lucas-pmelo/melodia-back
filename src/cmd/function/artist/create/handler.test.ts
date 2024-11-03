import {
  DatabaseConnection,
  DatabasePool,
  PoolFactory,
} from '@lucas-pmelo/database';
import { APIGatewayEvent, Context } from 'aws-lambda';
import { handler } from './handler';
import { mock } from 'jest-mock-extended';

describe('Handler - Create User', () => {
  const poolFactoryMock = jest.mocked(PoolFactory);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call createUser', async () => {
    const dbClientMock = mock<DatabasePool>();

    poolFactoryMock.getPool.mockResolvedValue(dbClientMock);
    dbClientMock.getConnection.mockResolvedValue(mock<DatabaseConnection>());

    const eventMock = mock<APIGatewayEvent>();
    const contextMock = mock<Context>();

    await handler(eventMock, contextMock);
  });
});
