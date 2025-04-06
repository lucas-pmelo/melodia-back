export type ArtistDbSchema = {
  id: string;
  name: string;
  email: string;
  genre: string[];
  password: string;
  created_at: string;
  updated_at: string;
  uri?: string;
  image?: string;
};
