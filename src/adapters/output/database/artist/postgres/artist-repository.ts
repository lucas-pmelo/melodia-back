import { DatabaseConnection } from '@lucas-pmelo/database';
import { Artist } from '~/domain/artist/entities/artist';
import { ArtistRepository as IArtistRepository } from '~/domain/artist/repositories/artist';

export class ArtistRepository implements IArtistRepository {
  constructor(private readonly connection: DatabaseConnection) {}
  findByName(name: string): Promise<Artist | null> {
    throw new Error('Method not implemented.');
  }
  create(artist: Artist): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
