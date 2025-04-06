import { Artist } from '~/domain/artist/entities/artist';

export const makeArtist = (override: Partial<Artist> = {}): Artist =>
  new Artist({
    id: '01960ca7-92e4-7ece-bbc8-cd2e6f0bea97',
    name: 'TREZE',
    email: 'treze@gmail.com',
    password: '$2y$10$ylkzL4jhN2HbLcTByJn0xu9MEzSUVbsjK3m0NSrCfRD55JpwnzsTG',
    genre: [],
    uri: 'https://melodia.com/treze',
    createdAt: new Date(),
    updatedAt: new Date(),
    image:
      'https://petcostumecenter.com/wp-content/uploads/2020/05/propeller-dog-hat.jpg',
    ...override,
  });
