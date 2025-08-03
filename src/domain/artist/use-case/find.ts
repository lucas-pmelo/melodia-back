import { ArtistRepository } from '../repositories/artist';

export class FindArtistUseCase {
  constructor(private artistRepository: ArtistRepository) {}

  async execute(name: string) {
    const artist = await this.artistRepository.findByName(name);

    if (!artist) {
      throw new Error(`Artist ${name} not found`);
    }

    return artist;
  }
}
