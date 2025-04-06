import { DatabaseConnection } from '@lucas-pmelo/database';
import { Artist } from '~/domain/artist/entities/artist';
import { ArtistRepository as IArtistRepository } from '~/domain/artist/repositories/artist';
import { FIND_ARTIST_BY_NAME } from './queries/find-by-name';
import logger from '@lucas-pmelo/logger';
import { DatabaseArtistMapper } from './mappers/database-artist-mapper';
import { ArtistDbSchema } from './dtos/database-artist-schema';
import { INSERT_ARTIST } from './queries/insert';

export class ArtistRepository implements IArtistRepository {
  constructor(private readonly connection: DatabaseConnection) {}
  async findByName(name: string): Promise<Artist | null> {
    const { records } = await this.connection.query({
      sql: FIND_ARTIST_BY_NAME,
      parameters: {
        name,
      },
    });

    if (!records.length) {
      logger.debug({
        message: 'Artist not found',
        data: {
          name,
          records,
        },
      });

      return null;
    }

    const [artist] = records;

    return DatabaseArtistMapper.toDomain(artist as ArtistDbSchema);
  }

  async create(artist: Artist): Promise<void> {
    const recordsToSave = DatabaseArtistMapper.toDatabase(artist);

    const columns = Object.keys(recordsToSave)
      .filter(
        (key) =>
          recordsToSave[key] !== undefined && recordsToSave[key] !== null,
      )
      .map((key) => {
        return key;
      });

    const parameters = columns.map((key) => {
      return `:${key}`;
    });

    await this.connection.query({
      sql: INSERT_ARTIST(columns.join(), parameters.join()),
      parameters: recordsToSave,
    });
  }
}
