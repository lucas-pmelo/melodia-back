import logger from '@lucas-pmelo/logger';
import { Artist } from '../entities/artist';
import { ConflictError } from '@lucas-pmelo/lambda-handlers';
import { ArtistRepository } from '../repositories/artist';

type Input = {
  name: string;
  email: string;
  password: string;
  image: string;
  genre: string[];
};

export class CreateArtistUseCase {
  constructor(private readonly artistRepository: ArtistRepository) {}

  async execute(input: Input): Promise<Artist> {
    const artist = await this.artistRepository.findByName(input.name);

    if (artist) {
      const message = 'Artist already existss';
      logger.warn({
        message: message,
        data: artist,
      });

      throw new ConflictError(message);
    }

    const newArtist = new Artist(input);

    logger.debug({
      message: 'Creating artist',
      data: artist,
    });

    await this.artistRepository.create(newArtist);

    return newArtist;
  }
}
