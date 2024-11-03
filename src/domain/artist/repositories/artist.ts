import { Artist } from '../entities/artist';

export interface ArtistRepository {
  findByName(name: string): Promise<Artist | null>;
  create(artist: Artist): Promise<void>;
}
