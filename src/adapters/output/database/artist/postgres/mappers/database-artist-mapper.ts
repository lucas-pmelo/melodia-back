import { Artist } from '~/domain/artist/entities/artist';
import { ArtistDbSchema } from '../dtos/database-artist-schema';

export class DatabaseArtistMapper {
  static toDomain(artist: ArtistDbSchema): Artist {
    return new Artist({
      id: artist.id,
      name: artist.name,
      genre: artist.genre,
      createdAt: new Date(artist.created_at),
      updatedAt: new Date(artist.updated_at),
      email: artist.email,
      password: artist.password,
      uri: artist.uri,
      image: artist.image,
    });
  }

  static toDatabase(artist: Artist): ArtistDbSchema {
    return {
      id: artist.id,
      name: artist.name,
      genre: artist.genre,
      created_at: artist.createdAt.toISOString(),
      updated_at: artist.updatedAt.toISOString(),
      email: artist.email,
      password: artist.password,
      uri: artist.uri,
      image: artist.image,
    };
  }
}
