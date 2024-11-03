import { DatabaseConnection } from '@lucas-pmelo/database';

export class UserRepository {
  constructor(private client: DatabaseConnection) {}
}
