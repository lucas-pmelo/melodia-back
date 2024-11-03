import { Artist } from '~/domain/artist/entities/artist';
import { ArtistResponse } from './dtos/create';

export class ArtistPresenter {
  static toHttp(artist: Artist): ArtistResponse {
    return {
      id: artist.id,
      createdAt: artist.createdAt,
      updatedAt: artist.updatedAt,
      name: artist.name,
      email: artist.email,
      password: artist.password,
      uri: artist.uri,
      image: artist.image,
      genre: artist.genre,
    };
  }
}
