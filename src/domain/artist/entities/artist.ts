import { Entity, EntityProps } from '~/domain/core/entities/entity';

export interface ArtistProps extends EntityProps {
  name: string;
  email: string;
  genre: string[];
  password: string;
  uri?: string;
  updatedAt?: Date;
  createdAt?: Date;
  image?: string;
}

export class Artist extends Entity {
  name: string;
  email: string;
  genre: string[];
  password: string;
  uri?: string;
  createdAt?: Date;
  updatedAt?: Date;
  image?: string;

  constructor(input: ArtistProps) {
    super(input.id);

    input.createdAt = input.createdAt ?? new Date();
    input.updatedAt = input.updatedAt ?? new Date();

    Object.assign(this, input);
  }
}
